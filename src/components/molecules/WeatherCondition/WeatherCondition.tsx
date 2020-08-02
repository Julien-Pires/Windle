import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { getPeriod } from '../../../modules/time';
import { DayForecast, HourForecast } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Icon, UpperText } from '../../atoms';
import { formatTemperature, getWeatherConditionIcon, SymbolDisplay } from '../../helpers';

export interface WeatherConditionProps {
    day: DayForecast,
    weather: HourForecast,
    style?: StyleProp<ViewStyle>
}

export const WeatherCondition = observer(({
    day,
    style,
    weather
}: WeatherConditionProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const period = getPeriod(weather.date, day.sunrise.time, day.sunset.time);

    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <Icon
                icon={ getWeatherConditionIcon(weather.condition, weather.clouds, period) }
                height='190'
                width='190' />
            <UpperText style={styles.temperature}>
                { formatTemperature(weather.temperature, UIStore.temperature, SymbolDisplay.Full) }
            </UpperText>
            <UpperText style={styles.condition}>{weather.condition.description}</UpperText>
        </View>
    );
})

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        container: {
            alignItems: 'center'
        },
        temperature: {
            ...theme.font.light.H3,
            color: theme.colors.onSurface,
            marginTop: 42
        },
        condition: {
            ...theme.font.normal.Body1,
            color: theme.colors.onSurface
        }
    });
});
