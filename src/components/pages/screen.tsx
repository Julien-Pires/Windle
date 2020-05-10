import React from 'react';
import { WeatherConditionBackground } from '../atoms/WeatherConditionBackground';
import { WeatherCondition } from '../../modules/weather';
import { SafeAreaView } from 'react-native';
import { Period } from '../../modules/time';

export const Screen = (props: React.PropsWithChildren<{}>) => {
    return (
        <WeatherConditionBackground
            condition={WeatherCondition.Clear}
            period={Period.Night}
            style={{
                flex: 1
            }}>
            <SafeAreaView></SafeAreaView>
            {props.children}
        </WeatherConditionBackground>
    );
}
