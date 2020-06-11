import { DateTime, Zone } from "luxon";

export enum WeatherDataKind {
    CurrentTemperature,
    MinTemperature,
    MaxTemperature,
    Sunrise,
    Sunset,
    Wind
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

export enum WeatherErrorKind {
    NotFound
}

export interface Sunrise {
    kind: WeatherDataKind.Sunrise,
    time: DateTime
}

export interface Sunset {
    kind: WeatherDataKind.Sunset,
    time: DateTime
}

export interface Wind {
    kind: WeatherDataKind.Wind,
    speed: number
}

export interface WeatherCondition {
    kind: WeatherConditionKind,
    description: string
}

export interface Temperature {
    value: number
}

export interface CurrentTemperature extends Temperature {
    kind: WeatherDataKind.CurrentTemperature
}

export interface MaxTemperature extends Temperature {
    kind: WeatherDataKind.MaxTemperature
}

export interface MinTemperature extends Temperature {
    kind: WeatherDataKind.MinTemperature
}

export type WeatherData =
    | MaxTemperature
    | MinTemperature
    | Sunrise
    | Sunset
    | Wind

export interface CityInfo {
    name: string,
    timezone: Zone
}

export interface Sky {
    clouds: Clouds,
    sunrise: Sunrise,
    sunset: Sunset,
    wind: Wind
}

export interface DayTemperature {
    current: CurrentTemperature,
    min: MinTemperature,
    max: MaxTemperature
}

export interface WeatherInfo {
    condition: WeatherCondition,
    temperature: DayTemperature,
    sky: Sky
}

export interface WeatherError {
    kind: WeatherErrorKind,
    detail: string | undefined
}
