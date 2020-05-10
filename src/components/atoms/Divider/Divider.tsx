import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface DividerProps {
    style: StyleProp<ViewStyle>
}

export const Divider = ({ style }: DividerProps) => {
    return (
        <View style={StyleSheet.flatten([styles.divider, style])} />
    );
}

const styles = {
    divider: {
        backgroundColor: 'black',
        height: StyleSheet.hairlineWidth
    }
}