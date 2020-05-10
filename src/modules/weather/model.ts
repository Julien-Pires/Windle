export enum TemperatureMetrics {
    Kelvin,
    Celsius,
    Fahrenheit
}

export enum WeatherCondition {
    Clear,
    Hot,
    Rain,
    Storm,
    Cloudy,
    Fog,
    Sleet,
    Sandstorm,
    Tornado
}

export interface WeatherInfo {
    city: string,
    time: Date,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
}

export enum WeatherErrorKind {
    NotFound
}

export interface WeatherError {
    kind: WeatherErrorKind,
    detail: string | undefined
}
