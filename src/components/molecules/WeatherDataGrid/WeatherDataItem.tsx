import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WeatherData, WeatherDataKind, WindModule } from '../../../modules/weather';
import { useStores } from '../../../stores';
import {
    Barometer, Cold, Hot, Humidity, Sunrise, Sunset, Temperature, Wind, WindDirection
} from '../../../styles/icons/icons';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';
import { SymbolDisplay, TemperatureHelper, WindHelper } from '../../helpers';
import { DateTimeDisplay, TimeHelper } from '../../helpers/time';

export interface WeatherDataItemProps {
    data: WeatherData,
    style?: StyleProp<ViewStyle>
}

export const WeatherDataItem = observer(({
    data,
    style
}: WeatherDataItemProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const icon = getIcon(data, UIStore.theme);

    return (
        <View style={StyleSheet.compose(style, styles.item)}>
            {icon}
            <UpperText style={styles.value}>{ getValue(data) }</UpperText>
            <UpperText style={styles.title}>{ getTitle(data) }</UpperText>
        </View>
    )
});

const getIcon = (data: WeatherData, theme: Theme) => {
    const props = iconProperties(theme);

    switch(data.kind) {
        case WeatherDataKind.FeelsLikeTemperature:
            return <Temperature {...props} />;

        case WeatherDataKind.Humidity:
            return <Humidity {...props} />;

        case WeatherDataKind.MaxTemperature:
            return <Hot {...props} />;

        case WeatherDataKind.MinTemperature:
            return <Cold {...props} />

        case WeatherDataKind.Pressure:
            return <Barometer {...props} />;

        case WeatherDataKind.Sunrise:
            return <Sunrise {...props} />;

        case WeatherDataKind.Sunset:
            return <Sunset {...props} />;

        case WeatherDataKind.WindDirection:
            return <WindDirection {...props} />;

        case WeatherDataKind.WindSpeed:
            return <Wind {...props} />;
    }
}

const getTitle = (data: WeatherData) => {
    switch(data.kind) {
        case WeatherDataKind.CurrentTemperature:
            return 'current';
            
        case WeatherDataKind.FeelsLikeTemperature:
            return 'feels like'

        case WeatherDataKind.Humidity:
            return 'humidity';

        case WeatherDataKind.MaxTemperature:
            return 'max';

        case WeatherDataKind.MinTemperature:
            return 'min';

        case WeatherDataKind.Pressure:
            return 'pressure'

        case WeatherDataKind.Sunrise:
            return 'sunrise';

        case WeatherDataKind.Sunset:
            return 'sunset';

        case WeatherDataKind.WindDirection:
            return 'direction';

        case WeatherDataKind.WindSpeed:
            return 'wind';
    }
}

const getValue = (data: WeatherData) : string => {
    const { UIStore } = useStores();

    switch(data.kind) {
        case WeatherDataKind.Humidity:
            return `${data.value} %`;

        case WeatherDataKind.FeelsLikeTemperature:
        case WeatherDataKind.MaxTemperature:
        case WeatherDataKind.MinTemperature:
            return TemperatureHelper.format(data, UIStore.temperature, SymbolDisplay.Short);

        case WeatherDataKind.Pressure:
            return `${data.value} hpa`;

        case WeatherDataKind.Sunrise:
        case WeatherDataKind.Sunset:
            return TimeHelper.format(data.time, DateTimeDisplay.Time);

        case WeatherDataKind.WindDirection:
            return WindModule.toDirection(data);

        case WeatherDataKind.WindSpeed:
            return WindHelper.format(data, UIStore.windSpeed, SymbolDisplay.Full);
    }

    return '';
}

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

const iconProperties = _.memoize((theme: Theme) => {
    const styles = stylesheet(theme);

    return {
        height: 28,
        width: 28,
        fill: theme.colors.onSurface,
        style: styles.icon
    }
});
