import * as shape from 'd3-shape';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Circle, G, Text } from 'react-native-svg';
import { LineChart } from 'react-native-svg-charts';
import { pure } from 'recompose';

import { getPeriod } from '../../../modules/time';
import { HourForecast, Sunrise, Sunset } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Icon } from '../../atoms';
import {
    convertTemperature, formatTemperature, getWeatherConditionIcon, SymbolDisplay
} from '../../helpers';

export interface ForecastChartItem extends HourForecast {
    sunrise: Sunrise,
    sunset: Sunset
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
    const temperatures = forecasts.map(c => convertTemperature(c.temperature, UIStore.temperature));
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
                data={ forecasts }
                yAccessor={ ({ index }) => temperatures[index] }>
                <TemperatureLabels theme={UIStore.theme} metrics={UIStore.temperature} />
                <ConditionIcons />
                <Hours theme={UIStore.theme} />
            </LineChart>
        </View>
    );
});

const TemperatureLabels = ({ theme, metrics, x, y, data }) => {
    return data.map((value: ForecastChartItem, index: number) => (
        <G key={`TemperatureLabel_${index}`}
            x={ x(index) }
            y={ y(convertTemperature(value.temperature, metrics)) }>
            <Text
                y={ -34 }
                fontWeight='bold'
                fontSize={ theme.font.bold.Body2.fontSize }
                fill={ theme.colors.onSurface }
                textAnchor={ 'middle' }>
                { formatTemperature(value.temperature, metrics, SymbolDisplay.Short) }
            </Text>
            <Text
                y={ -18 }
                fontSize={ theme.font.bold.Caption.fontSize }
                fill={ theme.colors.onSurface }
                textAnchor={ 'middle' }>
                {`${value.humidity.value}%`}
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

const ConditionIcons = ({ x, height, data }: unknown) => {
    return data.map((value: ForecastChartItem, index: number) => {
        const period = getPeriod(value.date, value.sunrise.time, value.sunset.time);
        const icon = getWeatherConditionIcon(value.condition, value.clouds, period);

        return (
            <G key={`ConditionIcon_${index}`}
                y={ height - 78 }
                x={ x(index) - 12 }>
                <Icon
                    icon={icon}
                    height={ 24 }
                    width={ 24 } />
            </G>
        );
    });
};

const Hours = ({ theme, x, height, data }: unknown) => {
    return data.map((value: ForecastChartItem, index: number) => (
        <Text key={`Hours_${index}`}
            y={ height - 28 }
            x={ x(index) }
            textAnchor={ 'middle' }
            fontSize={ theme.font.bold.Caption.fontSize }
            fill={ theme.colors.onSurface }>
            { index === 0 ? 'NOW' : `${value.date.hour}:00` }
        </Text>
    ));
};
