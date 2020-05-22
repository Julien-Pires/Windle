import React from 'react';
import { StyleProp, TextStyle, Text } from "react-native";

export interface UpperTextProps {
    children: string,
    style?: StyleProp<TextStyle>
}

export const UpperText = ({
    children,
    style
}: UpperTextProps) => {
    return (
        <Text style={style}>{children.toUpperCase()}</Text>
    );
}
