import { DateTime, FixedOffsetZone, Zone } from 'luxon';

import * as network from '../../utils/network';
import { Result, ResultKind } from '../../utils/types';
import {
    CityInfo, Clouds, Weather, WeatherCondition, WeatherConditionKind, WeatherDataKind,
    WeatherError, WeatherErrorKind, Forecast, HourForecast, DayForecast
} from './models';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const apiKey = '3d03324ab344b03be5e40b9fb8f6e463';

const cloudsQuantity = new Map([
    [801, Clouds.Few],
    [802, Clouds.Broken],
    [803, Clouds.Scattered],
    [804, Clouds.Overcast]
])

const weatherConditions : [number, number, WeatherConditionKind][] = [
    [200, 232, WeatherConditionKind.Storm],
    [500, 501, WeatherConditionKind.LightRain],
    [502, 504, WeatherConditionKind.HeavyRain],
    [511, 511, WeatherConditionKind.FreezingRain],
    [520, 531, WeatherConditionKind.ShowerRain],
    [600, 622, WeatherConditionKind.Snow],
    [781, 781, WeatherConditionKind.Tornado],
    [800, 800, WeatherConditionKind.Clear],
    [801, 804, WeatherConditionKind.Cloudy]
]

export interface WeatherResult {
    city: CityInfo,
    weather: Weather
}

export const getWeather = async (city: string): Promise<Result<WeatherResult, WeatherError>> => {
    const response = await fetch({ lat: '48.85', lon: '2.35' });

    switch(response.kind) {
        case ResultKind.Success:
            const data = response.data;
            const timezone = FixedOffsetZone.instance(data.timezone_offset / 60);
            const daily = data.daily.map((c: any) => getDailyForecast(c, data.hourly, timezone));
            const today = daily.shift() as DayForecast;
            
            return {
                kind: ResultKind.Success,
                data: {
                    city: { 
                        name: city,
                        timezone: timezone
                    },
                    weather : {
                        current: getHourlyForecast(data.current, timezone),
                        week: daily,
                        today: today
                    }
                }
            }

        case ResultKind.Failure:
            return {
                kind: ResultKind.Failure,
                error: { 
                    kind: WeatherErrorKind.NotFound,
                    detail: response.error
                }
            };
    }
}

const getDailyForecast = (data: any, hourly: any[], timezone: Zone): DayForecast => {
    const date = DateTime.fromSeconds(data.dt).setZone(timezone);
    const forecast = getForecast(data, timezone);
    const hourlyForecast = hourly
        .filter(data => {
            const weatherDate = DateTime.fromSeconds(data.dt).setZone(timezone);
            return weatherDate.day === date.day;
        })
        .map(data => getHourlyForecast(data, timezone));

    return {
        ...forecast,
        forecast: hourlyForecast,
        maxTemperature: {
            kind: WeatherDataKind.MaxTemperature,
            value: Math.ceil(data.temp.max)
        },
        minTemperature: {
            kind: WeatherDataKind.MinTemperature,
            value: Math.floor(data.temp.min)
        },
        sunrise: {
            kind: WeatherDataKind.Sunrise,
            time: DateTime.fromSeconds(data.sunrise).setZone(timezone)
        },
        sunset: {
            kind: WeatherDataKind.Sunset,
            time: DateTime.fromSeconds(data.sunset).setZone(timezone)
        }
    };
}

const getHourlyForecast = (data: any, timezone: Zone): HourForecast => {
    const forecast = getForecast(data, timezone);
    return {
        ...forecast,
        humidity: {
            kind: WeatherDataKind.Humidity,
            value: data.humidity
        },
        pressure: {
            kind: WeatherDataKind.Pressure,
            value: data.pressure
        },
        currentTemperature: {
            kind: WeatherDataKind.CurrentTemperature,
            value: data.temp
        },
        feelsLikeTemperature: {
            kind: WeatherDataKind.FeelsLikeTemperature,
            value: data.feels_like
        }
    };
}

const getForecast = (data: any, timezone: Zone): Forecast => {
    return {
        condition: getWeatherCondition(data.weather),
        date: DateTime.fromSeconds(data.dt).setZone(timezone),
        clouds: getClouds(data.weather),
        wind: {
            direction: {
                kind: WeatherDataKind.WindDirection,
                value: data.wind_deg
            },
            speed: {
                kind: WeatherDataKind.WindSpeed,
                value: data.wind_speed
            }
        }
    }
}

const getClouds = (weather: any[]) : Clouds => {
    const clouds = weather.map(c => cloudsQuantity.get(c.id)).filter((c) : c is Clouds => c !== undefined);

    return clouds.shift() ?? Clouds.None; 
}

const getWeatherCondition = (weathers: any[]) : WeatherCondition => {
    const results = weathers.map((c) : WeatherCondition => {
        const condition = findWeathercCondition(c);
        return { 
            kind: condition,
            description: c.description
        }
    })
    
    if(!results) {
        return {
            kind: WeatherConditionKind.Clear,
            description: 'Clear'
        }
    }

    if(results.length >= 2) {
        return results.filter(c => c.kind !== WeatherConditionKind.Cloudy)[0];
    }

    return results[0];
}

const findWeathercCondition = (weather: any) : WeatherConditionKind => {
    const result = weatherConditions.find(([start, end, _]) => {
        return weather.id >= start && weather.id <= end
    });
    if(result) {
        const [,, condition] = result;
        
        return condition;
    }

    return WeatherConditionKind.Clear;
}

const fetch = async (params: object) => {
    return await network.query(openWeatherUrl, {
        ...params,
        appid: apiKey
    });
}
