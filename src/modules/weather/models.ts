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
    Storm,
    Tornado
}

interface Sun<T extends WeatherDataKind.Sunrise | WeatherDataKind.Sunset> {
    kind: T,
    time: DateTime
}

export type Sunrise = Sun<WeatherDataKind.Sunrise>

export type Sunset = Sun<WeatherDataKind.Sunset>

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

interface TemperatureData<
    TempKind extends 
        | WeatherDataKind.CurrentTemperature
        | WeatherDataKind.FeelsLikeTemperature
        | WeatherDataKind.MaxTemperature
        | WeatherDataKind.MinTemperature> {
    kind: TempKind,
    value: number
}

export type CurrentTemperature = TemperatureData<WeatherDataKind.CurrentTemperature>

export type FeelsLikeTemperature = TemperatureData<WeatherDataKind.FeelsLikeTemperature>

export type MaxTemperature = TemperatureData<WeatherDataKind.MaxTemperature>

export type MinTemperature = TemperatureData<WeatherDataKind.MinTemperature>

export type Temperature =
    | CurrentTemperature
    | FeelsLikeTemperature
    | MaxTemperature
    | MinTemperature

export type WeatherData =
    | Humidity
    | Pressure
    | Sunrise
    | Sunset
    | CurrentTemperature
    | MinTemperature
    | MaxTemperature
    | FeelsLikeTemperature
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
    temperature: CurrentTemperature,
    feelsLike: FeelsLikeTemperature,
    humidity: Humidity,
    pressure: Pressure
}

export interface DayForecast extends Forecast {
    forecast: HourForecast[],
    maxTemperature: MaxTemperature,
    minTemperature: MinTemperature,
    sunrise: Sunrise,
    sunset: Sunset
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
