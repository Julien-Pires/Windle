import { observable } from 'mobx';

import { TimeStore, WeatherStore } from './dataStores';

export class DataStore {
    @observable readonly time: TimeStore;
    @observable readonly weather : WeatherStore;

    constructor() {
        this.time = new TimeStore();
        this.weather = new WeatherStore(this.time);
        
        this.weather.loadWeather('Paris');
    }
}
