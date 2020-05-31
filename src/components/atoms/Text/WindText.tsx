import React from 'react';
import { Wind, WindMetrics, WindModule } from "../../../modules/weather";
import { useStores } from '../../../hooks';
import { UpperText } from './UpperText';
import { SymbolDisplay } from './shared';
import { StyleProp, TextStyle } from 'react-native';

export interface WindTextProps {
    wind: Wind,
    display?: SymbolDisplay,
    style?: StyleProp<TextStyle>
}

export const WindText = ({
    wind,
    display,
    style
}: WindTextProps) => {
    const { UIStore } = useStores();
    const value = UIStore.windSpeed == WindMetrics.Kmh 
        ? WindModule.toKilometerPerHour(wind) 
        : WindModule.toMilesPerHour(wind);
    const symbol = getSymbol(UIStore.windSpeed, display ?? SymbolDisplay.None);

    return (
        <UpperText style={style}>{`${value.toFixed().toString()} ${symbol}`}</UpperText>
    );
}

const getSymbol = (measure: WindMetrics, display: SymbolDisplay) => {
    if(display === SymbolDisplay.None) {
        return '';
    }
    
    switch(measure) {
        case WindMetrics.Kmh:
            return 'km/h';

        case WindMetrics.Mph:
            return 'mph';
    }
}