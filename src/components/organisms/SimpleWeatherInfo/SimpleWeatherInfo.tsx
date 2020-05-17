import React from 'react';
import * as theme from '../../../styles/light';
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { WeatherCondition, WeatherInfoGrid } from '../../molecules';
import { Divider } from '../../atoms';

export interface SimpleWeatherInfoProps {
    style: StyleProp<ViewStyle>
}

export const SimpleWeatherInfo = ({
    style
}: SimpleWeatherInfoProps) => {
    return (
        <View style={style}>
            <WeatherCondition />
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
