import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as theme from '../../../styles/light';
import { TemperatureText, SymbolDisplay, UpperText, WeatherConditionIcon } from '../../atoms';
import { WeatherInfo } from '../../../modules/weather';
import { Period } from '../../../modules/time';

export interface WeatherConditionProps {
    weather: WeatherInfo,
    style?: StyleProp<ViewStyle>
}

export const WeatherCondition = ({
    weather,
    style
}: WeatherConditionProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <WeatherConditionIcon
                condition={weather.condition.kind}
                sky={weather.sky}
                period={Period.Day}
                height={190}
                width={190} />
            <TemperatureText
                style={styles.temperature}
                temperature={weather.temperature.current}
                display={SymbolDisplay.Full} />
            <UpperText style={styles.condition}>{weather.condition.description}</UpperText>
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
