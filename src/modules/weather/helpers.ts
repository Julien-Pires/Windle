import { Temperature, Wind } from './models';

export class WindModule {
    public static toKilometerPerHour(wind: Wind) {
        return wind.speed * 4.248;
    }

    public static toMilesPerHour(wind: Wind) {
        return wind.speed * 2.64;
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