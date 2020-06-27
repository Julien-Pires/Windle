import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { getPeriod } from '../../../modules/time';
import { DayForecast, HourForecast } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText, WeatherConditionIcon } from '../../atoms';
import { SymbolDisplay, TemperatureHelper } from '../../helpers';

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

    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <WeatherConditionIcon
                condition={weather.condition}
                clouds={weather.clouds}
                period={ getPeriod(weather.date, day.sunrise.time, day.sunset.time) }
                height='190'
                width='190' />
            <UpperText style={styles.temperature}>
                { TemperatureHelper.format(weather.currentTemperature, UIStore.temperature, SymbolDisplay.Full) }
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
