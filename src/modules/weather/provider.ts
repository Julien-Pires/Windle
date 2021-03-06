import { DateTime, FixedOffsetZone, Zone } from 'luxon';

import * as network from '../../utils/network';
import { Result, ResultKind } from '../../utils/types';
import {
    CityInfo, Clouds, DayForecast, Forecast, HourForecast, Weather, WeatherCondition,
    WeatherConditionKind, WeatherDataKind, WeatherError, WeatherErrorKind
} from './models';

export interface WeatherResult {
    city: CityInfo,
    weather: Weather
}

export const getWeather = async (city: string): Promise<Result<WeatherResult, WeatherError>> => {
    const response = await fetch({ lat: '48.85', lon: '2.35' });

    switch(response.kind) {
        case ResultKind.Success: {
            const data = response.data as OpenWeatherResult;
            const timezone = FixedOffsetZone.instance(data.timezone_offset / 60);
            const daily = data.daily.map(c => getDailyForecast(c, data.hourly, timezone));
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
            };
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
};

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const apiKey = '3d03324ab344b03be5e40b9fb8f6e463';

const cloudsQuantity = new Map([
    [ 801, Clouds.Few ],
    [ 802, Clouds.Broken ],
    [ 803, Clouds.Scattered ],
    [ 804, Clouds.Overcast ]
]);

const weatherConditions : [number, number, WeatherConditionKind][] = [
    [ 200, 232, WeatherConditionKind.Storm ],
    [ 500, 501, WeatherConditionKind.LightRain ],
    [ 502, 504, WeatherConditionKind.HeavyRain ],
    [ 511, 511, WeatherConditionKind.FreezingRain ],
    [ 520, 531, WeatherConditionKind.ShowerRain ],
    [ 600, 622, WeatherConditionKind.Snow ],
    [ 781, 781, WeatherConditionKind.Tornado ],
    [ 800, 800, WeatherConditionKind.Clear ],
    [ 801, 804, WeatherConditionKind.Cloudy ]
];

interface OpenWeatherCondition {
    id: number,
    description: string
}

interface OpenWeatherClouds {
    id: number
}

interface OpenWeatherForecast {
    dt: number,
    weather: (OpenWeatherCondition & OpenWeatherClouds)[],
    wind_deg: number,
    wind_speed: number
}

interface OpenWeatherHourlyForecast extends OpenWeatherForecast {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number
}

interface OpenWeatherDailyForecast extends OpenWeatherForecast {
    temp: {
        max: number,
        min: number
    },
    sunrise: number,
    sunset: number
}

interface OpenWeatherResult {
    current: OpenWeatherHourlyForecast,
    daily: OpenWeatherDailyForecast[],
    hourly: OpenWeatherHourlyForecast[],
    timezone_offset: number
}

const getDailyForecast = (
    dailyForecast: OpenWeatherDailyForecast, 
    hourlyForecast: OpenWeatherHourlyForecast[], 
    timezone: Zone): DayForecast => {
    const date = DateTime.fromSeconds(dailyForecast.dt).setZone(timezone);
    const forecast = getForecast(dailyForecast, timezone);
    const hours = hourlyForecast
        .filter(data => {
            const weatherDate = DateTime.fromSeconds(data.dt).setZone(timezone);
            return weatherDate.day === date.day;
        })
        .map(data => getHourlyForecast(data, timezone));

    return {
        ...forecast,
        forecast: hours,
        maxTemperature: {
            kind: WeatherDataKind.MaxTemperature,
            value: Math.ceil(dailyForecast.temp.max)
        },
        minTemperature: {
            kind: WeatherDataKind.MinTemperature,
            value: Math.floor(dailyForecast.temp.min)
        },
        sunrise: {
            kind: WeatherDataKind.Sunrise,
            time: DateTime.fromSeconds(dailyForecast.sunrise).setZone(timezone)
        },
        sunset: {
            kind: WeatherDataKind.Sunset,
            time: DateTime.fromSeconds(dailyForecast.sunset).setZone(timezone)
        }
    };
};

const getHourlyForecast = (data: OpenWeatherHourlyForecast, timezone: Zone): HourForecast => {
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
        temperature: {
            kind: WeatherDataKind.CurrentTemperature,
            value: data.temp
        },
        feelsLike: {
            kind: WeatherDataKind.FeelsLikeTemperature,
            value: data.feels_like
        }
    };
};

const getForecast = (data: OpenWeatherForecast, timezone: Zone): Forecast => {
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
    };
};

const getClouds = (weather: OpenWeatherClouds[]) : Clouds => {
    const clouds = weather.map(c => cloudsQuantity.get(c.id)).filter((c) : c is Clouds => c !== undefined);

    return clouds.shift() ?? Clouds.None; 
};

const getWeatherCondition = (weathers: OpenWeatherCondition[]) : WeatherCondition => {
    const results = weathers.map((c) : WeatherCondition => {
        const condition = findWeathercCondition(c);
        return { 
            kind: condition,
            description: c.description
        };
    });
    
    if(!results) {
        return {
            kind: WeatherConditionKind.Clear,
            description: 'Clear'
        };
    }

    if(results.length >= 2) {
        return results.filter(c => c.kind !== WeatherConditionKind.Cloudy)[0];
    }

    return results[0];
};

const findWeathercCondition = (weather: OpenWeatherCondition) : WeatherConditionKind => {
    const result = weatherConditions.find(([ start, end ]) => {
        return weather.id >= start && weather.id <= end;
    });
    if(result) {
        const [ ,, condition ] = result;
        
        return condition;
    }

    return WeatherConditionKind.Clear;
};

const fetch = async (params: Record<string, unknown>) => {
    return await network.query(openWeatherUrl, {
        ...params,
        appid: apiKey
    });
};
