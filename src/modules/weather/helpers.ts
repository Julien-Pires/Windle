import { Temperature, WindDirection, WindSpeed } from './models';

export class WindModule {
    static readonly _directions = [
        {
            direction: 'NNE',
            min: 11.25,
            max: 33.75
        },
        {
            direction: 'NE',
            min: 33.75,
            max: 56.25
        },
        {
            direction: 'ENE',
            min: 56.25,
            max: 78.75
        },
        {
            direction: 'E',
            min: 78.75,
            max: 101.25
        },
        {
            direction: 'ESE',
            min: 101.25,
            max: 123.75
        },
        {
            direction: 'SE',
            min: 123.75,
            max: 146.25
        },
        {
            direction: 'SSE',
            min: 146.25,
            max: 168.75
        },
        {
            direction: 'S',
            min: 168.75,
            max: 191.25
        },
        {
            direction: 'SSW',
            min: 191.25,
            max: 213.75
        },
        {
            direction: 'SW',
            min: 213.75,
            max: 236.25
        },
        {
            direction: 'WSW',
            min: 236.25,
            max: 258.75
        },
        {
            direction: 'W',
            min: 258.75,
            max: 281.25
        },
        {
            direction: 'WNW',
            min: 281.25,
            max: 303.75
        },
        {
            direction: 'NW',
            min: 303.75,
            max: 326.25
        },
        {
            direction: 'NNW',
            min: 326.25,
            max: 348.75
        }
    ];

    public static toKilometerPerHour(wind: WindSpeed) {
        return wind.value * 4.248;
    }

    public static toMilesPerHour(wind: WindSpeed) {
        return wind.value * 2.64;
    }

    public static toDirection(wind: WindDirection) {
        const result = this._directions.find(c => wind.value >= c.min && wind.value <= c.max);

        return result ? result.direction : 'N';
    }
}

export class TemperatureModule {
    public static toCelsius(temperature: Temperature) {
        return temperature.value - 273.15;
    }

    public static toFahrenheit(temperature: Temperature) {
        return (temperature.value - 273.15) * 9/5 + 32;
    }
}
