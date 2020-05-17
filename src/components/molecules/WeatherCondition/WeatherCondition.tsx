import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as theme from '../../../styles/light';
import { Temperature, SymbolDisplay } from '../../atoms';
import Rain from '../../../../assets/icons/weather/conditions/rain.svg';

export interface WeatherConditionProps {
    style?: StyleProp<ViewStyle>
}

export const WeatherCondition = ({ style }: WeatherConditionProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <Rain height={190} width={190}></Rain>
            <Temperature 
                style={styles.temperature}
                symbol={SymbolDisplay.Full}>
                55
            </Temperature>
            <Text style={styles.condition}>SUN & RAIN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    temperature: {
        ...theme.text.light.H3,
        color: theme.colors.onSurface,
        marginTop: 42
    },
    condition: {
        ...theme.text.normal.Body1,
        color: theme.colors.onSurface
    }
});
