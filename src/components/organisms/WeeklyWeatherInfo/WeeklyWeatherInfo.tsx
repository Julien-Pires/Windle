import _ from 'lodash';
import React from 'react';
import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Period } from '../../../modules/time';
import { DayForecast, Weather } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText, WeatherConditionIcon } from '../../atoms';
import { SymbolDisplay, TemperatureHelper } from '../../helpers';
import { DividerTitle } from '../../molecules';

export interface WeeklyWeatherInfoProps {
    weather: Weather,
    style?: StyleProp<ViewStyle>
}

export const WeeklyWeatherInfo = ({
    weather,
    style
}: WeeklyWeatherInfoProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={style}>
            <DividerTitle style={styles.divider}>Weekly Fourecast</DividerTitle>
            <FlatList 
                style={styles.list}
                scrollEnabled={false}
                data={[weather.today,...weather.week]}
                renderItem={ ({ item, index }) => <Item style={styles.listItem} forecast={item} index={index} /> } />
        </View>
    );
}

interface ItemProps {
    forecast: DayForecast,
    index: number,
    style: StyleProp<ViewStyle>
}

const Item = ({
    forecast,
    index,
    style
}: ItemProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={ StyleSheet.compose(style, styles.itemContainer) }>
            <UpperText style={styles.itemDay}>
                { index === 0 ? 'today' : forecast.date.toLocaleString({ weekday: 'long' }) }
            </UpperText>
            <WeatherConditionIcon
                condition={forecast.condition}
                clouds={forecast.clouds}
                period={Period.Day}
                height={24}
                width={24} />
            <UpperText style={styles.itemConditionDescription}>
                { forecast.condition.description }
            </UpperText>
            <UpperText style={styles.itemTemperature}>
                { TemperatureHelper.format(forecast.maxTemperature, UIStore.temperature, SymbolDisplay.Short) }
            </UpperText>
            <UpperText style={styles.itemTemperature}>
                { TemperatureHelper.format(forecast.minTemperature, UIStore.temperature, SymbolDisplay.Short) }
            </UpperText>
        </View>
    );
}

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        divider: {
            marginLeft: 18,
            marginBottom: 14
        },
        list: {
            marginLeft: 18,
            marginRight: 12
        },
        listItem: {
            marginTop: 16,
            marginBottom: 16
        },
        itemContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemDay: {
            ...theme.font.normal.Body2,
            color: theme.colors.onSurface,
            flex: 1
        },
        itemConditionDescription: {
            ...theme.font.light.Caption,
            color: theme.colors.onSurface,
            flex: 1,
            marginLeft: 16
        },
        itemTemperature: {
            ...theme.font.normal.Body2,
            color: theme.colors.onSurface,
            marginLeft: 16
        }
    });
});