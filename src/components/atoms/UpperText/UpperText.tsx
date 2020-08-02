import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export interface UpperTextProps {
    children: string,
    style?: StyleProp<TextStyle>
}

export const UpperText = ({
    children,
    style
}: UpperTextProps): JSX.Element => {
    return (
        <Text style={style}>{children.toUpperCase()}</Text>
    );
};
