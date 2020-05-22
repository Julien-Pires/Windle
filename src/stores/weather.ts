import { observable } from 'mobx';
import { WeatherInfo, getCurrentWeather } from '../modules/weather';
import { ResultKind } from '../utils/types';

export class WeatherStore {
    @observable weather : WeatherInfo | undefined = undefined;

    constructor() {
        this.loadWeather('Paris');
    }

    async loadWeather(city: string) {
        const result = await getCurrentWeather(city);
        this.weather = result.kind === ResultKind.Success ? result.data : undefined;
        console.log(this.weather);
    }
}
