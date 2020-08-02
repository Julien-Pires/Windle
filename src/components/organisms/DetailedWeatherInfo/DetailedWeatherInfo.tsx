import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Weather } from '../../../modules/weather';
import { DividerTitle, ForecastChart, WeatherDataGrid } from '../../molecules';

export interface DetailedWeatherInfoProps {
    weather: Weather,
    style?: StyleProp<ViewStyle>
}

export const DetailedWeatherInfo = ({
    weather,
    style
}: DetailedWeatherInfoProps) : JSX.Element => {
    const forecasts =
        [ weather.today, ...weather.week ]
            .flatMap(day => day.forecast.map(c => ({ day: day, forecast: c })))
            .slice(0, 7)
            .map(({ day, forecast }) => ({
                ...forecast,
                sunrise: day.sunrise,
                sunset: day.sunset
            }));

    return (
        <View style={style}>
            <DividerTitle style={stylesheet.divider}>Details</DividerTitle>
            <WeatherDataGrid values={[
                weather.today.sunrise,
                weather.current.pressure,
                weather.current.feelsLike,

                weather.today.sunset,
                weather.current.humidity,
                weather.current.wind.direction
            ]} />

            <DividerTitle style={stylesheet.divider}>Hourly Forecast</DividerTitle>
            <ForecastChart style={stylesheet.chart} forecasts={forecasts} />
        </View>
    );
};

const stylesheet = StyleSheet.create({
    divider: {
        marginLeft: 18,
        marginBottom: 14
    },
    chart: {
        marginLeft: 6,
        marginRight: 8
    }
});
