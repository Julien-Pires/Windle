import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import * as theme from '../../styles/default';
import { Temperature } from '../../atoms/Temperature';
import { MinMaxTemperature } from '../../molecules/minMaxTemperature/MinMaxTemperature';

export const TemperatureInfo = () => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <View style={styles.temperatureBlock}>
                <Text style={styles.conditionText}>
                    Clear
                </Text>
                <Temperature style={styles.temperatureText} value={25} />
            </View>
            <View style={styles.minMaxBlock}>
                <MinMaxTemperature min={20} max={28} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conditionText: {
        ...theme.text.normal.H2,
        color: theme.colors.onPrimary
    },
    temperatureText: {
        ...theme.text.light.H1,
        color: theme.colors.onPrimary
    },
    temperatureBlock: {
        marginLeft: 42
    },
    minMaxBlock: {
        marginLeft: 'auto',
        marginRight: 42,
        marginBottom: 32,
        alignSelf: 'flex-end' 
    }
})