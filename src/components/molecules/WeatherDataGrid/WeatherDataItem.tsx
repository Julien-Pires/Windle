import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { WeatherData, WeatherDataKind } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Cold, Hot, Sunrise, Sunset, Wind } from '../../../styles/icons/icons';
import { Theme } from '../../../styles/theme';
import {
    DateTimeDisplay, DateTimeText, SymbolDisplay, TemperatureText, UpperText, WindText
} from '../../atoms';

export interface WeatherDataItemProps {
    data: WeatherData
}

export const WeatherDataItem = observer(({
    data
}: WeatherDataItemProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const icon = getIcon(data, UIStore.theme);
    const title = getTitle(data);
    const value = getValue(data, UIStore.theme);

    return (
        <View style={styles.item}>
            {icon}
            <UpperText style={styles.title}>{title}</UpperText>
            {value}
        </View>
    )
});

const getIcon = (data: WeatherData, theme: Theme) => {
    const styles = stylesheet(theme);

    switch(data.kind) {
        case WeatherDataKind.MaxTemperature:
            return <Hot style={styles.icon} fill={theme.colors.onSurface} />;

        case WeatherDataKind.MinTemperature:
            return <Cold style={styles.icon} fill={theme.colors.onSurface} />

        case WeatherDataKind.Sunrise:
            return <Sunrise style={styles.icon} fill={theme.colors.onSurface} />;

        case WeatherDataKind.Sunset:
            return <Sunset style={styles.icon} fill={theme.colors.onSurface} />;

        case WeatherDataKind.Wind:
            return <Wind style={styles.icon} fill={theme.colors.onSurface} />;
    }
}

const getTitle = (data: WeatherData) => {
    switch(data.kind) {
        case WeatherDataKind.MaxTemperature:
            return 'max';

        case WeatherDataKind.MinTemperature:
            return 'min';

        case WeatherDataKind.Sunrise:
            return 'sunrise';

        case WeatherDataKind.Sunset:
            return 'sunset';

        case WeatherDataKind.Wind:
            return 'wind';
    }
}

const getValue = (data: WeatherData, theme: Theme) => {
    const styles = stylesheet(theme);

    switch(data.kind) {
        case WeatherDataKind.MaxTemperature:
        case WeatherDataKind.MinTemperature:
            return <TemperatureText style={styles.value} temperature={data} display={SymbolDisplay.Short} />

        case WeatherDataKind.Sunrise:
        case WeatherDataKind.Sunset:
            return <DateTimeText style={styles.value} date={data.time} display={DateTimeDisplay.Time} />

        case WeatherDataKind.Wind:
            return <WindText style={styles.value} wind={data} display={SymbolDisplay.Full} />
    }
}

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        item: {
            alignItems: 'center',
        },
        icon: {
            height: 32,
            width: 32,
            marginBottom: 18,
            color: theme.colors.onSurface
        },
        title: {
            ...theme.font.light.Body2,
            color: theme.colors.onSurface,
        },
        value: {
            ...theme.font.normal.H6,
            color: theme.colors.onSurface
        },
    });
});
