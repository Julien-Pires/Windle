import { DateTime, Zone } from 'luxon';

export enum WeatherDataKind {
    CurrentTemperature,
    Humidity,
    FeelsLikeTemperature,
    MinTemperature,
    MaxTemperature,
    Pressure,
    Sunrise,
    Sunset,
    WindDirection,
    WindSpeed
}

export enum TemperatureMetrics {
    Kelvin,
    Celsius,
    Fahrenheit
}

export enum WindMetrics {
    Kmh,
    Mph
}

export enum Clouds {
    None,
    Few,
    Scattered,
    Broken,
    Overcast
}

export enum WeatherConditionKind {
    Clear,
    Cloudy,
    FreezingRain,
    HeavyRain,
    LightRain,
    ShowerRain,
    Snow,
    Storm
}

export interface Sun<T extends WeatherDataKind.Sunrise | WeatherDataKind.Sunset> {
    kind: T,
    time: DateTime
}

export interface WindSpeed {
    kind: WeatherDataKind.WindSpeed,
    value: number
}

export interface WindDirection {
    kind: WeatherDataKind.WindDirection,
    value: number
}

export interface Wind {
    direction: WindDirection,
    speed: WindSpeed
}

export interface Humidity {
    kind: WeatherDataKind.Humidity,
    value: number
}

export interface Pressure {
    kind: WeatherDataKind.Pressure,
    value: number
}

export interface WeatherCondition {
    kind: WeatherConditionKind,
    description: string
}

export type TemperatureKind =
    | WeatherDataKind.CurrentTemperature
    | WeatherDataKind.FeelsLikeTemperature
    | WeatherDataKind.MaxTemperature
    | WeatherDataKind.MinTemperature

export interface Temperature<TempKind extends TemperatureKind> {
    kind: TempKind,
    value: number
}

export type WeatherData =
    | Humidity
    | Pressure
    | Sun<WeatherDataKind.Sunrise>
    | Sun<WeatherDataKind.Sunset>
    | Temperature<WeatherDataKind.CurrentTemperature>
    | Temperature<WeatherDataKind.MinTemperature>
    | Temperature<WeatherDataKind.MaxTemperature>
    | Temperature<WeatherDataKind.FeelsLikeTemperature>
    | WindDirection
    | WindSpeed

export interface CityInfo {
    name: string,
    timezone: Zone
}

export interface Forecast {
    clouds: Clouds,
    condition: WeatherCondition,
    date: DateTime,
    wind: Wind
}

export interface HourForecast extends Forecast {
    currentTemperature: Temperature<WeatherDataKind.CurrentTemperature>,
    feelsLikeTemperature: Temperature<WeatherDataKind.FeelsLikeTemperature>,
    humidity: Humidity,
    pressure: Pressure
}

export interface DayForecast extends Forecast {
    forecast: HourForecast[],
    maxTemperature: Temperature<WeatherDataKind.MaxTemperature>,
    minTemperature: Temperature<WeatherDataKind.MinTemperature>,
    sunrise: Sun<WeatherDataKind.Sunrise>,
    sunset: Sun<WeatherDataKind.Sunset>
}

export interface Weather {
    current: HourForecast,
    week: DayForecast[],
    today: DayForecast
}

export enum WeatherErrorKind {
    NotFound
}

export interface WeatherError {
    kind: WeatherErrorKind,
    detail: string | undefined
}
