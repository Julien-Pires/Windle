import React, { PropsWithChildren } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

export enum SymbolDisplay {
    None,
    Short,
    Full
}

export interface TemperatureProps {
    symbol?: SymbolDisplay,
    style?: StyleProp<TextStyle>
}

export const Temperature = ({
    children,
    symbol,
    style
}: PropsWithChildren<TemperatureProps>) => {
    let textSymbol = '';
    if(symbol === SymbolDisplay.Short) {
        textSymbol = '°';
    } else if(symbol === SymbolDisplay.Full) {
        textSymbol = '°C';
    }

    return (
        <Text style={style}>
            {children}{textSymbol}
        </Text>
    );
}