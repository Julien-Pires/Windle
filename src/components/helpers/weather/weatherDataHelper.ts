import { SvgProps } from 'react-native-svg';

import { Period } from '../../../modules/time';
import {
    Clouds, TemperatureMetrics, WeatherCondition, WeatherConditionKind, WeatherData,
    WeatherDataKind, WindMetrics, WindModule
} from '../../../modules/weather';
import Icons from '../../../styles/icons';
import { DateTimeDisplay, formatDate } from '../time/dateTimeHelper';
import { SymbolDisplay } from './';
import { formatTemperature } from './temperatureHelper';
import { formatWindSpeed } from './windHelper';

export const getWeatherConditionIcon = (
    condition: WeatherCondition,
    clouds: Clouds,
    period: Period) : React.FC<SvgProps> => {
    const icons = period === Period.Day ? Icons.weather.conditions.day : Icons.weather.conditions.night;

    switch(condition.kind) {
        case WeatherConditionKind.Clear:
            return icons.Clear;

        case WeatherConditionKind.Cloudy:
            switch(clouds) {
                case Clouds.Few:
                    return icons.FewClouds;

                case Clouds.Broken:
                case Clouds.Scattered:
                    return icons.BrokenClouds;

                case Clouds.Overcast:
                    return icons.OvercastClouds;
            }
            break;
        
        case WeatherConditionKind.LightRain:
            return icons.Rain;

        case WeatherConditionKind.HeavyRain:
            return icons.HeavyRain;

        case WeatherConditionKind.FreezingRain:
            return icons.FreezingRain;

        case WeatherConditionKind.ShowerRain:
            return icons.ShowerRain;

        case WeatherConditionKind.Snow:
            switch(clouds) {
                case Clouds.Few:
                case Clouds.Broken:
                    return icons.LightSnow;

                case Clouds.Scattered:
                case Clouds.Overcast:
                    return icons.Snow;
            }
            break;

        case WeatherConditionKind.Storm:
            return icons.Storm;

        case WeatherConditionKind.Tornado:
            return icons.Tornado;
    }

    return Icons.misc.NoIcon;
};

export const getWeatherDataIcon = (data: WeatherData) : React.FC<SvgProps> => {
    switch(data.kind) {
        case WeatherDataKind.FeelsLikeTemperature:
            return Icons.weather.misc.Temperature;

        case WeatherDataKind.Humidity:
            return Icons.weather.misc.Humidity;

        case WeatherDataKind.MaxTemperature:
            return Icons.weather.misc.Hot;

        case WeatherDataKind.MinTemperature:
            return Icons.weather.misc.Cold;

        case WeatherDataKind.Pressure:
            return Icons.weather.misc.Barometer;

        case WeatherDataKind.Sunrise:
            return Icons.weather.misc.Sunrise;

        case WeatherDataKind.Sunset:
            return Icons.weather.misc.Sunset;

        case WeatherDataKind.WindDirection:
            return Icons.weather.misc.WindDirection;

        case WeatherDataKind.WindSpeed:
            return Icons.weather.misc.Wind;
    }

    return Icons.misc.NoIcon;
};

export const getWeatherDataValue = ({
    data,
    temperature,
    wind
}: {
    data: WeatherData,
    temperature?: TemperatureMetrics,
    wind?: WindMetrics
}) : string => {
    switch(data.kind) {
        case WeatherDataKind.Humidity:
            return `${data.value} %`;

        case WeatherDataKind.FeelsLikeTemperature:
        case WeatherDataKind.MaxTemperature:
        case WeatherDataKind.MinTemperature:
            return formatTemperature(data, temperature ?? TemperatureMetrics.Celsius, SymbolDisplay.Short);

        case WeatherDataKind.Pressure:
            return `${data.value} hpa`;

        case WeatherDataKind.Sunrise:
        case WeatherDataKind.Sunset:
            return formatDate(data.time, DateTimeDisplay.Time);

        case WeatherDataKind.WindDirection:
            return WindModule.toDirection(data);

        case WeatherDataKind.WindSpeed:
            return formatWindSpeed(data, wind ?? WindMetrics.Kmh, SymbolDisplay.Full);
    }

    return '';
};
