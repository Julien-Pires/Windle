import * as network from '../../utils/network';
import {
    Clouds,
    WeatherInfo, 
    WeatherError, 
    WeatherErrorKind, 
    WeatherCondition, 
    WeatherConditionKind,
    WeatherDataKind
} from './models';
import { Result, ResultKind } from '../../utils/types';
import { FixedOffsetZone, DateTime } from 'luxon';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f57316e024e87ad5ea0e12c5c8560426';

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
    [800, 800, WeatherConditionKind.Clear],
    [801, 804, WeatherConditionKind.Cloudy]
]

export const getCurrentWeather = async (city: string): Promise<Result<WeatherInfo, WeatherError>> => {
    const response = await fetch({ q: city });

    switch(response.kind) {
        case ResultKind.Success:
            const data = response.data;
            
            return {
                kind: ResultKind.Success,
                data: {
                    city: { 
                        name: data.name,
                        timezone: FixedOffsetZone.instance(data.timezone / 60)
                    },
                    temperature: {
                        current: { 
                            kind: WeatherDataKind.CurrentTemperature,
                            value: data.main.temp
                        },
                        min: {
                            kind: WeatherDataKind.MinTemperature,
                            value: data.main.temp_min
                        },
                        max: {
                            kind: WeatherDataKind.MaxTemperature,
                            value: data.main.temp_max
                        }
                    },
                    sky: {
                        clouds: getClouds(data.weather),
                        sunrise: {
                            kind: WeatherDataKind.Sunrise,
                            time: DateTime.fromSeconds(data.sys.sunrise)
                        },
                        sunset: {
                            kind: WeatherDataKind.Sunset,
                            time: DateTime.fromSeconds(data.sys.sunset)
                        },
                        wind: {
                            kind: WeatherDataKind.Wind,
                            speed: data.wind.speed
                        }
                    },
                    condition: getWeatherCondition(data.weather)
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

const getClouds = (weather: any[]) : Clouds => {
    const clouds = weather.map(c => cloudsQuantity.get(c.id)).filter((c) : c is Clouds => c !== undefined);

    return clouds ? clouds[0] : Clouds.None; 
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
