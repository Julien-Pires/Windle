import * as network from '../../utils/network';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'f57316e024e87ad5ea0e12c5c8560426';

export const get = async (params: object) => {
    return await network.query(openWeatherUrl, {
        ...params,
        appid: apiKey
    });
}
