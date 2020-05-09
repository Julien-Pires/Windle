import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { WeatherCondition } from '../../../modules/weather';
import { getBackground } from './style';
import { Period } from '../../../modules/time';

interface WeatherConditionBackgroundProps {
    condition: WeatherCondition,
    period: Period,
    style?: object
}

export const WeatherConditionBackground = ({
    condition,
    period,
    style,
    children
}: React.PropsWithChildren<WeatherConditionBackgroundProps>) => {
    const { colors, positions } = getBackground(condition, period);
    return (
        <LinearGradient
            style={style}
            colors={colors}
            locations={positions}>
            {children}
        </LinearGradient>
    );
}
