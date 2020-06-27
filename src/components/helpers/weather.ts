import {
    Temperature, TemperatureKind, TemperatureMetrics, TemperatureModule, WeatherDataKind,
    WindMetrics, WindModule, WindSpeed
} from '../../modules/weather';

export enum SymbolDisplay {
    None,
    Short,
    Full
}

export class TemperatureHelper {
    static format(
        temperature: Temperature<TemperatureKind>,
        metrics: TemperatureMetrics,
        display: SymbolDisplay | undefined) {
        const symbol = this.getSymbol(metrics, display ?? SymbolDisplay.Full);
        const value = this.convert(temperature, metrics);

        return `${value.toFixed()}${symbol}`;
    }

    static convert(
        temperature: Temperature<TemperatureKind>,
        metrics: TemperatureMetrics) {
        const value = metrics === TemperatureMetrics.Celsius 
            ? TemperatureModule.toCelsius(temperature) 
            : TemperatureModule.toFahrenheit(temperature);

        return Math.floor(value);
    }

    private static getSymbol(kind: TemperatureMetrics, display: SymbolDisplay) {
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
    }
}

export class WindHelper {
    static format(
        speed: WindSpeed,
        metrics: WindMetrics,
        display: SymbolDisplay | undefined) {
        const symbol = this.getSymbol(metrics, display ?? SymbolDisplay.Full);
        const value = this.convert(speed, metrics);

        return `${value.toFixed()} ${symbol}`;
    }

    static convert(speed: WindSpeed, metric: WindMetrics) {
        const value = metric == WindMetrics.Kmh  
            ? WindModule.toKilometerPerHour(speed) 
            : WindModule.toMilesPerHour(speed);

        return Math.floor(value);
    }

    private static getSymbol (measure: WindMetrics, display: SymbolDisplay) {
        if(display === SymbolDisplay.None) {
            return '';
        }
        
        switch(measure) {
            case WindMetrics.Kmh:
                return 'km/h';
    
            case WindMetrics.Mph:
                return 'mph';
        }
    }
}
