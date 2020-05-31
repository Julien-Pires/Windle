import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as theme from '../../../styles/light';
import { Sunset, Sunrise, Wind, Hot, Cold } from '../../../styles/icons/icons';
import { UpperText, DateTimeText, WindText, SymbolDisplay, DateTimeDisplay, TemperatureText } from '../../atoms';
import { WeatherData, WeatherDataKind } from "../../../modules/weather";

export interface WeatherDataItemProps {
    data: WeatherData
}

export const WeatherDataItem = ({
    data
}: WeatherDataItemProps) => {
    const icon = getIcon(data);
    const title = getTitle(data);
    const value = getValue(data);

    return (
        <View style={styles.item}>
            {icon}
            <UpperText style={styles.title}>{title}</UpperText>
            {value}
        </View>
    )
}

const getIcon = (data: WeatherData) => {
    switch(data.kind) {
        case WeatherDataKind.MaxTemperature:
            return <Hot style={styles.icon} />;

        case WeatherDataKind.MinTemperature:
            return <Cold style={styles.icon} />

        case WeatherDataKind.Sunrise:
            return <Sunrise style={styles.icon} />;

        case WeatherDataKind.Sunset:
            return <Sunset style={styles.icon} />;

        case WeatherDataKind.Wind:
            return <Wind style={styles.icon} />;
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

const getValue = (data: WeatherData) => {
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

const styles = StyleSheet.create({
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
        ...theme.text.light.Body2,
        color: theme.colors.onSurface,
    },
    value: {
        ...theme.text.normal.H6,
        color: theme.colors.onSurface
    },
})
