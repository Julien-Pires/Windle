import * as network from '../../utils/network';
import { 
    WeatherInfo, 
    WeatherError, 
    WeatherErrorKind, 
    WeatherCondition, 
    WeatherConditionKind, 
    Clouds,
    Sky
} from './model';
import { Result, ResultKind } from '../../utils/types';

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

const getSky = (weather: any[]) : Sky => {
    const clouds = weather.map(c => cloudsQuantity.get(c.id)).filter((c) : c is Clouds => c !== undefined);
    if(!clouds) {
        return { clouds: Clouds.None };
    }

    return { clouds: clouds[0] }; 
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
