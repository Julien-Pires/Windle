import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as theme from '../../styles/default';
import { Temperature } from '../../atoms/Temperature';
import { Divider } from '../../atoms/Divider';

export interface MinMaxTemperatureProps {
    min: number,
    max: number
}

export const MinMaxTemperature = ({
    min,
    max
}: MinMaxTemperatureProps) => {
    return (
        <View>
            <Temperature 
                style={styles.text} 
                value={min} 
                displaySymbol={true} />
            <Divider style={styles.divider} />
            <Temperature 
                style={styles.text} 
                value={max} 
                displaySymbol={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...theme.text.normal.H5,
        color: theme.colors.onPrimaryLight
    },
    divider: {
        backgroundColor: theme.colors.onPrimaryExtraLight,
        height: 1,
        marginTop: 10,
        marginBottom: 10
    }
});