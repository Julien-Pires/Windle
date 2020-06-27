import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Period } from '../../../modules/time';
import { Clouds, WeatherCondition, WeatherConditionKind } from '../../../modules/weather';
import { dayConditions, nightConditions } from '../../../styles/icons/conditions';

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
    const icons = period === Period.Day ? dayConditions : nightConditions;

    switch(condition.kind) {
        case WeatherConditionKind.Clear:
            return <icons.Clear {... props} />;

        case WeatherConditionKind.Cloudy:
            switch(clouds) {
                case Clouds.Few:
                    return <icons.FewClouds {... props} />;

                case Clouds.Broken:
                case Clouds.Scattered:
                    return <icons.BrokenClouds {... props} />;

                case Clouds.Overcast:
                    return <icons.OvercastClouds {... props} />;
            }

        case WeatherConditionKind.LightRain:
            return <icons.Rain {... props} />;

        case WeatherConditionKind.HeavyRain:
            return <icons.HeavyRain {... props} />;

        case WeatherConditionKind.FreezingRain:
            return <icons.FreezingRain {... props} />;

        case WeatherConditionKind.ShowerRain:
            return <icons.ShowerRain {... props} />;

        case WeatherConditionKind.Snow:
            switch(clouds) {
                case Clouds.Few:
                case Clouds.Broken:
                    return <icons.LightSnow {... props} />;

                case Clouds.Scattered:
                case Clouds.Overcast:
                    return <icons.Snow {... props} />;
            }

        case WeatherConditionKind.Storm:
            return <icons.Storm {...props} />;

        case WeatherConditionKind.Tornado:
            return <icons.Tornado {...props} />;
    }
}
