import { observable } from "mobx";
import { TemperatureMetrics } from "../modules/weather";

export class UIStore {
    @observable temperature : TemperatureMetrics = TemperatureMetrics.Celsius;
}
