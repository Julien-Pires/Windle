import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { Temperature, TemperatureMetrics, TemperatureModule } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { SymbolDisplay } from './shared';
import { UpperText } from './UpperText';

export interface TemperatureTextProps {
    temperature: Temperature,
    display?: SymbolDisplay,
    style?: StyleProp<TextStyle>
}

export const TemperatureText = observer(({
    temperature,
    display,
    style
}: TemperatureTextProps) => {
    const { UIStore } = useStores();
    const symbol = getSymbol(UIStore.temperature, display ?? SymbolDisplay.Full);
    const value = UIStore.temperature === TemperatureMetrics.Celsius 
        ? TemperatureModule.toCelsius(temperature) 
        : TemperatureModule.toFahrenheit(temperature);

    return (
        <UpperText style={style}>
            {`${value.toFixed()}${symbol}`}
        </UpperText>
    );
})

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
