import { observable } from "mobx";
import { TemperatureMetrics, WindMetrics } from "../modules/weather";

export class UIStore {
    @observable temperature : TemperatureMetrics = TemperatureMetrics.Celsius;
    @observable windSpeed : WindMetrics = WindMetrics.Kmh;
}
