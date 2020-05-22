import * as network from '../../utils/network';
import { WeatherInfo, WeatherError, WeatherErrorKind, WeatherSky, CloudsQuantity, WeatherCondition, WeatherConditionKind } from './model';
import { Result, ResultKind } from '../../utils/types';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f57316e024e87ad5ea0e12c5c8560426';

const cloudsQuantity = new Map([
    [801, CloudsQuantity.Few],
    [802, CloudsQuantity.Broken],
    [803, CloudsQuantity.Scattered],
    [804, CloudsQuantity.Overcast]
])

const weatherConditions : [number, number, WeatherConditionKind][] = [
    [200, 232, WeatherConditionKind.Storm],
    [500, 501, WeatherConditionKind.LightRain],
    [502, 504, WeatherConditionKind.HeavyRain],
    [511, 511, WeatherConditionKind.FreezingRain],
    [520, 531, WeatherConditionKind.ShowerRain],
    [600, 622, WeatherConditionKind.Snow]
]

export const getCurrentWeather = async (city: string): Promise<Result<WeatherInfo, WeatherError>> => {
    const response = await fetch({ q: city });

    switch(response.kind) {
        case ResultKind.Success:
            const data = response.data;
            const sky = getSky(data.weather);
            const condition = getWeatherCondition(data.weather);
            return {
                kind: ResultKind.Success,
                data: {
                    city: data.name,
                    time: new Date(Date.now()),
                    temperature: {
                        current: data.main.temp,
                        min: data.main.temp_min,
                        max: data.main.temp_max
                    },
                    sky: sky,
                    condition: condition
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

const getSky = (weather: any[]) : WeatherSky => {
    const clouds = weather.find(c => cloudsQuantity.has(c.id));
    if(clouds) {
        return {
            kind: 'clouds',
            quantity: clouds ?? CloudsQuantity.Few
        }
    }

    return { kind: 'clear' };  
}

const getWeatherCondition = (weathers: any[]) : WeatherCondition => {
    const condition = weathers.find(findWeathercCondition);
    if(!condition) {
        return {
            kind: WeatherConditionKind.None,
            description: ''
        }
    }
    
    return {
        kind: findWeathercCondition(condition),
        description: condition.description
    };
}

const findWeathercCondition = (weather: any) : WeatherConditionKind => {
    const result = weatherConditions.find(([start, end, _]) => {
        return weather.id >= start && weather.id <= end
    });
    if(result) {
        const [,, condition] = result;
        
        return condition;
    }

    return WeatherConditionKind.None;
}

const fetch = async (params: object) => {
    return await network.query(openWeatherUrl, {
        ...params,
        appid: apiKey
    });
}
