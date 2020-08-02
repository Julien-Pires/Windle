import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface DividerProps {
    style: StyleProp<ViewStyle>
}

export const Divider = ({ style }: DividerProps) : JSX.Element => {
    return (
        <View style={StyleSheet.flatten([ styles.divider, style ])} />
    );
};

const styles = {
    divider: {
        backgroundColor: 'black',
        height: StyleSheet.hairlineWidth
    }
};
