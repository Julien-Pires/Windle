import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import * as theme from '../../../styles/light';
import { Divider } from '../../atoms';
import { WeatherCondition, WeatherInfoGrid } from '../../molecules';
import { WeatherInfo } from '../../../modules/weather';

export interface SimpleWeatherInfoProps {
    weather: WeatherInfo,
    style: StyleProp<ViewStyle>
}

export const SimpleWeatherInfo = ({
    weather,
    style
}: SimpleWeatherInfoProps) => {
    return (
        <View style={style}>
            <WeatherCondition weather={weather} />
            <Divider style={styles.divider} />
            <WeatherInfoGrid values={[ '6.00', '9.00', '7.00' ]} />
        </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: 40,
        marginTop: 34,
        marginBottom: 34,
        alignSelf: 'center',
        backgroundColor: theme.colors.onSurface
    }
});
