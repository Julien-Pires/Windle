import { WeatherCondition } from "../../../modules/weather";
import { Period } from "../../../modules/time";

const defaultPositions = [0.25, 1];

const hot = [
    '#7A0053',
    '#FF1F1E'
];

const rain = [
    '#2A4F98',
    '#CB9B95'
];

const clearDay = [
    '#2593D9',
    '#4DADDF'
];

const clearNight = [
    '#0D1549',
    '#9762A2'
];

export interface Gradient {
    colors: string[],
    positions: number[]
} 

export const getBackground = (
    condition: WeatherCondition,
    period: Period
) : Gradient => {
    switch(condition) {
        case WeatherCondition.Rain:
        case WeatherCondition.Storm:
            return {
                colors: rain,
                positions: defaultPositions
            };

        case WeatherCondition.Hot:
            return {
                colors: hot,
                positions: defaultPositions
            };

        case WeatherCondition.Clear:
            switch(period) {
                case Period.Day:
                    return {
                        colors: clearDay,
                        positions: defaultPositions
                    }

                case Period.Night:
                    return {
                        colors: clearNight,
                        positions: defaultPositions
                    }
            }
    }

    throw new Error(`${condition} is an invalid condition`);
}