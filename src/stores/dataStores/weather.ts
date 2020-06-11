import { DateTime } from 'luxon';
import { computed, observable } from 'mobx';

import { CityInfo, getCurrentWeather, WeatherInfo } from '../../modules/weather';
import { ResultKind } from '../../utils/types';
import { TimeStore } from './time';

export interface City extends CityInfo {
    date: DateTime
}

export class WeatherStore {
    @observable private _city : CityInfo | undefined = undefined;

    @observable weather : WeatherInfo | undefined = undefined;

    @computed get city() : City | undefined {
        if(!this._city) {
            return undefined;
        }

        return {
            ...this._city,
             date: this._timeStore.date.setZone(this._city.timezone)
        };
    }

    constructor(readonly _timeStore: TimeStore) { }

    async loadWeather(city: string) {
        const result = await getCurrentWeather(city);
        if(result.kind === ResultKind.Failure) {
            return;
        }

        this._city = result.data.city;
        this.weather = result.data.weather;
    }
}
