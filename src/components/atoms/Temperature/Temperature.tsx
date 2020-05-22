import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { UpperText } from '../UpperText';
import { useStores } from '../../../hooks';
import { TemperatureMetrics } from '../../../modules/weather';

export enum SymbolDisplay {
    None,
    Short,
    Full
}

export interface TemperatureProps {
    temperature: number,
    display?: SymbolDisplay,
    style?: StyleProp<TextStyle>
}

export const Temperature = observer(({
    temperature,
    display,
    style
}: TemperatureProps) => {
    const store = useStores().UIStore;
    const symbol = getSymbol(store.temperature, display ?? SymbolDisplay.Full);
    const value = getTemperature(temperature, store.temperature);

    return (
        <UpperText style={style}>
            {`${value.toFixed()}${symbol}`}
        </UpperText>
    );
})

function getTemperature(temperature: number, kind: TemperatureMetrics): number {
    switch(kind) {
        case TemperatureMetrics.Celsius:
            return temperature - 273.15;

        case TemperatureMetrics.Fahrenheit:
            return (temperature - 273.15) * 9/5 + 32;
    }

    return temperature;
}

function getSymbol(kind: TemperatureMetrics, display: SymbolDisplay) {
    switch(kind) {
        case TemperatureMetrics.Celsius:
            switch(display) {
                case SymbolDisplay.Short:
                    return '°';

                case SymbolDisplay.Full:
                    return '°C';
            }
            break;

        case TemperatureMetrics.Fahrenheit:
            switch(display) {
                case SymbolDisplay.Short:
                    return '°';

                case SymbolDisplay.Full:
                    return '°F';
            }
            break;
    }

    return '';
}
