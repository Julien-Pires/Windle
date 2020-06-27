import * as shape from 'd3-shape';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Circle, G, Text } from 'react-native-svg';
import { LineChart } from 'react-native-svg-charts';
import { pure } from 'recompose';

import { getPeriod } from '../../../modules/time';
import { Clouds, Temperature, WeatherCondition, TemperatureKind, DayForecast } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { WeatherConditionIcon } from '../../atoms';
import { SymbolDisplay, TemperatureHelper } from '../../helpers';

export interface ForecastChartItem {
    condition: WeatherCondition,
    clouds: Clouds,
    date: DateTime,
    day: DayForecast,
    temperature: Temperature<TemperatureKind>
}

export interface ForecastChartProps {
    forecasts: ForecastChartItem[],
    style: StyleProp<ViewStyle>
}

export const ForecastChart = pure(({
    forecasts,
    style
}: ForecastChartProps) => {
    const { UIStore } = useStores();
    const temperatures = forecasts.map(c => TemperatureHelper.convert(c.temperature, UIStore.temperature));
    const minTemp = Math.min(...temperatures) - 4;
    const maxTemp = Math.max(...temperatures) + 4;

    return (
        <View style={ style }>
            <LineChart
                style={{ height: 230 }}
                yMin={ minTemp }
                yMax={ maxTemp }
                curve={ shape.curveMonotoneX }
                svg={{ stroke: UIStore.theme.colors.onSurface, strokeWidth: 2 }}
                contentInset={{ top: 28, bottom: 80, left: 20, right: 20 }}
                data={ temperatures }>
                <TemperatureLabels forecasts={forecasts} theme={UIStore.theme} metrics={UIStore.temperature} />
                <ConditionIcons forecasts={forecasts} />
                <Hours forecasts={forecasts} theme={UIStore.theme} />
            </LineChart>
        </View>
    );
})

const TemperatureLabels = ({ forecasts, theme, metrics, x, y, data }: any) => {
    return data.map((value: any, index: number) => (
        <G
            x={ x(index) }
            y={ y(value) }>
            <Text
                y={ -34 }
                fontWeight='bold'
                fontSize={ theme.font.bold.Body2.fontSize }
                fill={ theme.colors.onSurface }
                textAnchor={ 'middle' }>
                { TemperatureHelper.format(forecasts[index].temperature, metrics, SymbolDisplay.Short) }
            </Text>
            <Text
                y={ -18 }
                fontSize={ theme.font.bold.Caption.fontSize }
                fill={ theme.colors.onSurface }
                textAnchor={ 'middle' }>
                30%
            </Text>
            <Circle
                r={ 4 }
                strokeWidth={ 1 }
                stroke={ theme.colors.onSurface }
                fill={ theme.colors.onSurface }
            />
        </G>
    ));
};

const ConditionIcons = ({ forecasts, x, y, height, data }: any) => {
    return data.map((_: any, index: number) => (
        <G
            y={ height - 78 }
            x={ x(index) - 12 }>
            <WeatherConditionIcon
                condition={ forecasts[index].condition }
                clouds={ forecasts[index].clouds }
                period={ getPeriod(forecasts[index].date, forecasts[index].day.sunrise.time, forecasts[index].day.sunset.time) }
                height={ 24 }
                width={ 24 } />
        </G>
    ));
}

const Hours = ({ forecasts, theme, x, y, height, data }: any) => {
    return data.map((_: any, index: number) => (
        <Text
            y={ height - 28 }
            x={ x(index) }
            textAnchor={ 'middle' }
            fontSize={ theme.font.bold.Caption.fontSize }
            fill={ theme.colors.onSurface }>
            { index === 0 ? 'NOW' : `${forecasts[index].date.hour}:00` }
        </Text>
    ));
}
