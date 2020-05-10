import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

export interface TemperatureProps {
    value: number,
    displaySymbol?: boolean,
    style?: StyleProp<TextStyle>
}

export const Temperature = ({
    value,
    displaySymbol,
    style
}: TemperatureProps) => {
    const text = displaySymbol ? `${value.toString()}°C` : `${value.toString()}°`;
    return (
        <Text style={style}>
            {text}
        </Text>
    );
}