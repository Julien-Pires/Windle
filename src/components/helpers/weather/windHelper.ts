import { WindMetrics, WindModule, WindSpeed } from '../../../modules/weather';
import { SymbolDisplay } from './shared';

export const formatWindSpeed = (
    speed: WindSpeed,
    metrics: WindMetrics,
    display: SymbolDisplay | undefined): string => {
    const symbol = getSymbol(metrics, display ?? SymbolDisplay.Full);
    const value = convertWindSpeed(speed, metrics);

    return `${value.toFixed()} ${symbol}`;
};

export const convertWindSpeed = (speed: WindSpeed, metric: WindMetrics): number => {
    const value = metric == WindMetrics.Kmh  
        ? WindModule.toKilometerPerHour(speed) 
        : WindModule.toMilesPerHour(speed);

    return Math.floor(value);
};

const getSymbol = (measure: WindMetrics, display: SymbolDisplay) => {
    if(display === SymbolDisplay.None) {
        return '';
    }
    
    switch(measure) {
        case WindMetrics.Kmh:
            return 'km/h';

        case WindMetrics.Mph:
            return 'mph';
    }
};
