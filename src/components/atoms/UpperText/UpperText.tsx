import React from 'react';
import { Text, TextProps } from 'react-native';

export interface UpperTextProps extends TextProps {
    children: string
}

export const UpperText = ({
    children,
    style
}: UpperTextProps): JSX.Element => {
    return (
        <Text style={style}>{children.toUpperCase()}</Text>
    );
};
