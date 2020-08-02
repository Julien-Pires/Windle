import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WeatherData, WeatherDataKind } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Icon, UpperText } from '../../atoms';
import { getWeatherDataIcon, getWeatherDataValue } from '../../helpers';

export interface WeatherDataItemProps {
    data: WeatherData,
    style?: StyleProp<ViewStyle>
}

export const WeatherDataGridItem = observer(({
    data,
    style
}: WeatherDataItemProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const icon = getWeatherDataIcon(data);
    const value = getWeatherDataValue({
        data: data,
        temperature: UIStore.temperature,
        wind: UIStore.windSpeed
    });

    return (
        <View style={StyleSheet.compose(style, styles.item)}>
            <Icon style={styles.icon} icon={icon} height={28} width={28} fill={UIStore.theme.colors.onSurface} />
            <UpperText style={styles.value}>{ value }</UpperText>
            <UpperText style={styles.title}>{ getTitle(data) }</UpperText>
        </View>
    );
});

const getTitle = (data: WeatherData) => {
    switch(data.kind) {
        case WeatherDataKind.CurrentTemperature:
            return 'current';
            
        case WeatherDataKind.FeelsLikeTemperature:
            return 'feels like';

        case WeatherDataKind.Humidity:
            return 'humidity';

        case WeatherDataKind.MaxTemperature:
            return 'max';

        case WeatherDataKind.MinTemperature:
            return 'min';

        case WeatherDataKind.Pressure:
            return 'pressure';

        case WeatherDataKind.Sunrise:
            return 'sunrise';

        case WeatherDataKind.Sunset:
            return 'sunset';

        case WeatherDataKind.WindDirection:
            return 'direction';

        case WeatherDataKind.WindSpeed:
            return 'wind';
    }
};

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        item: {
            alignItems: 'center'
        },
        icon: {
            marginBottom: 14,
            color: theme.colors.onSurface
        },
        title: {
            ...theme.font.light.Body2,
            color: theme.colors.onSurface,
        },
        value: {
            ...theme.font.normal.Body1,
            color: theme.colors.onSurface,
            marginBottom: 4
        },
    });
});
