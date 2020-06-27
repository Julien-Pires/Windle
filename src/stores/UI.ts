import { computed, observable } from 'mobx';
import { Appearance, ColorSchemeName } from 'react-native-appearance';

import { TemperatureMetrics, WindMetrics } from '../modules/weather';
import { darkTheme, lightTheme, Theme } from '../styles/theme';
import { DataStore } from './data';

export class UIStore {
    @observable private _OSTheme : ColorSchemeName = Appearance.getColorScheme();

    @observable temperature : TemperatureMetrics = TemperatureMetrics.Celsius;

    @observable windSpeed : WindMetrics = WindMetrics.Kmh;

    @computed get theme() : Theme {
        if(this._OSTheme === 'dark') {
            return darkTheme;
        }

        const weather = this._dataStore.weather.weather;
        const city = this._dataStore.weather.city;
        if(!weather || !city) {
            return lightTheme;
        }

        const sunset = weather.today.sunset;
        const sunrise = weather.today.sunrise;
        
        return city.date > sunrise.time && city.date < sunset.time ? lightTheme : darkTheme;
    }

    constructor (readonly _dataStore : DataStore) {}
}
