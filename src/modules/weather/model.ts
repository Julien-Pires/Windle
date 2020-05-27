import { Zone } from "luxon";

export interface City {
    name: string,
    timezone: Zone
}

export enum TemperatureMetrics {
    Kelvin,
    Celsius,
    Fahrenheit
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

export interface WeatherCondition {
    kind: WeatherConditionKind,
    description: string
}

export interface Sky {
    clouds: Clouds
}

export interface Temperature {
    current: number,
    min: number,
    max: number
}

export interface WeatherInfo {
    city: City,
    temperature: Temperature,
    condition: WeatherCondition,
    sky: Sky
}

export enum WeatherErrorKind {
    NotFound
}

export interface WeatherError {
    kind: WeatherErrorKind,
    detail: string | undefined
}
