import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Period } from '../../../modules/time';
import { Clouds, Forecast, WeatherConditionKind, WeatherCondition } from '../../../modules/weather';
import {
    BrokenClouds, FewClouds, FreezingRain, HeavyRain, NightFull, NightHalf, OvercastClouds, Rain,
    ShowerRain, Snow, Storm, Sun
} from '../../../styles/icons/conditions';

export interface WeatherConditionIconProps extends SvgProps {
    clouds: Clouds,
    condition: WeatherCondition,
    period: Period
}

export const WeatherConditionIcon = (props: WeatherConditionIconProps) => {
    const {
        clouds,
        condition,
        period
    } = props;

    switch(condition.kind) {
        case WeatherConditionKind.Clear:
            if(period === Period.Day) {
                return <Sun {... props} />;
            } else {
                return <NightHalf {... props} />;
            }

        case WeatherConditionKind.Cloudy:
            if(period === Period.Day) {
                switch(clouds) {
                    case Clouds.Few:
                        return <FewClouds {... props} />;

                    case Clouds.Broken:
                    case Clouds.Scattered:
                        return <BrokenClouds {... props} />;

                    case Clouds.Overcast:
                        return <OvercastClouds {... props} />;
                }
            } else {
                return <NightFull {... props} />;
            }

        case WeatherConditionKind.LightRain:
            return <Rain {... props} />;

        case WeatherConditionKind.HeavyRain:
            return <HeavyRain {... props} />;

        case WeatherConditionKind.FreezingRain:
            return <FreezingRain {... props} />;

        case WeatherConditionKind.ShowerRain:
            return <ShowerRain {... props} />;

        case WeatherConditionKind.Snow:
            return <Snow {... props} />;

        case WeatherConditionKind.Storm:
            return <Storm {... props} />;
    }
}