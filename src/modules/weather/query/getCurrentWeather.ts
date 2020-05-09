import * as weather from '../provider';
import { WeatherInfo, WeatherError, WeatherErrorKind } from '../model';
import { ResultKind, Result } from '../../../utils/types';

export const getCurrentWeather = async (city: string): Promise<Result<WeatherInfo, WeatherError>> => {
    const response = await weather.get({ q: city });

    switch(response.kind) {
        case ResultKind.Success:
            const data = response.data;
            return {
                kind: ResultKind.Success,
                data: {
                    city: data.name,
                    time: new Date(Date.now()),
                    temperature: data.main.temp,
                    minTemperature: data.main.temp_min,
                    maxTemperature: data.main.temp_max
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
