import {
    Temperature, TemperatureKind, TemperatureMetrics, TemperatureModule
} from '../../../modules/weather';
import { SymbolDisplay } from './shared';

export const formatTemperature = (
    temperature: Temperature<TemperatureKind>,
    metrics: TemperatureMetrics,
    display: SymbolDisplay | undefined) => {
    const symbol = getSymbol(metrics, display ?? SymbolDisplay.Full);
    const value = convertTemperature(temperature, metrics);

    return `${value.toFixed()}${symbol}`;
}

export const convertTemperature = (
    temperature: Temperature<TemperatureKind>,
    metrics: TemperatureMetrics) => {
    const value = metrics === TemperatureMetrics.Celsius 
        ? TemperatureModule.toCelsius(temperature) 
        : TemperatureModule.toFahrenheit(temperature);

    return Math.floor(value);
}

const getSymbol = (kind: TemperatureMetrics, display: SymbolDisplay) => {
    switch(kind) {
        case TemperatureMetrics.Celsius:
            switch(display) {
                case SymbolDisplay.Short:
                    return '°';

                case SymbolDisplay.Full:
                    return '°C';
            }
            break;

        case TemperatureMetrics.Fahrenheit:
            switch(display) {
                case SymbolDisplay.Short:
                    return '°';

                case SymbolDisplay.Full:
                    return '°F';
            }
            break;
    }

    return '';
};
