import React from 'react';
import { SvgProps } from "react-native-svg";
import { WeatherConditionKind, Clouds, Sky } from "../../../modules/weather";
import { Period } from "../../../modules/time";
import { 
    Sun, 
    NightHalf, 
    NightFull, 
    FewClouds, 
    BrokenClouds, 
    OvercastClouds, 
    Rain,
    HeavyRain,
    FreezingRain,
    ShowerRain,
    Snow,
    Storm 
} from '../../../styles/icons/conditions';

export interface WeatherConditionIconProps extends SvgProps {
    condition: WeatherConditionKind,
    sky: Sky,
    period: Period
}

export const WeatherConditionIcon = ({
    condition,
    sky,
    period,
    height,
    width
}: WeatherConditionIconProps) => {
    switch(condition) {
        case WeatherConditionKind.Clear:
            if(period === Period.Day) {
                return <Sun height={height} width={width} />;
            } else {
                return <NightHalf height={height} width={width} />;
            }

        case WeatherConditionKind.Cloudy:
            if(period === Period.Day) {
                switch(sky.clouds) {
                    case Clouds.Few:
                        return <FewClouds height={height} width={width} />;

                    case Clouds.Broken:
                    case Clouds.Scattered:
                        return <BrokenClouds height={height} width={width} />;

                    case Clouds.Overcast:
                        return <OvercastClouds height={height} width={width} />;
                }
            } else {
                return <NightFull height={height} width={width} />;
            }

        case WeatherConditionKind.LightRain:
            return <Rain height={height} width={width} />;

        case WeatherConditionKind.HeavyRain:
            return <HeavyRain height={height} width={width} />;

        case WeatherConditionKind.FreezingRain:
            return <FreezingRain height={height} width={width} />;

        case WeatherConditionKind.ShowerRain:
            return <ShowerRain height={height} width={width} />;

        case WeatherConditionKind.Snow:
            return <Snow height={height} width={width} />;

        case WeatherConditionKind.Storm:
            return <Storm height={height} width={width} />;
    }
}