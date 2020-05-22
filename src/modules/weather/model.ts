export enum TemperatureMetrics {
    Kelvin,
    Celsius,
    Fahrenheit
}

export enum CloudsQuantity {
    Few,
    Scattered,
    Broken,
    Overcast
}

export interface ClearSky {
    kind: 'clear'
}

export interface Clouds {
    kind: 'clouds',
    quantity: CloudsQuantity
}

export type WeatherSky =
    | ClearSky
    | Clouds

export enum WeatherConditionKind {
    None,
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

export interface Temperature {
    current: number,
    min: number,
    max: number
}

export interface WeatherInfo {
    city: string,
    time: Date,
    temperature: Temperature,
    condition: WeatherCondition,
    sky: WeatherSky
}

export enum WeatherErrorKind {
    NotFound
}

export interface WeatherError {
    kind: WeatherErrorKind,
    detail: string | undefined
}
