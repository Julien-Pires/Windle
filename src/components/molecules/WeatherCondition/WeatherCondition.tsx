import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as theme from '../../../styles/light';
import { Temperature, SymbolDisplay, UpperText } from '../../atoms';
import Rain from '../../../../assets/icons/weather/conditions/rain.svg';
import { WeatherInfo, WeatherCondition as wc, WeatherSky, WeatherConditionKind } from '../../../modules/weather';

export interface WeatherConditionProps {
    weather: WeatherInfo,
    style?: StyleProp<ViewStyle>
}

export const WeatherCondition = ({
    weather,
    style
}: WeatherConditionProps) => {
    const condition = getConditionDescription(weather.condition, weather.sky);

    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <Rain height={190} width={190} />
            <Temperature
                style={styles.temperature}
                temperature={weather.temperature.current}
                display={SymbolDisplay.Full} />
            <UpperText style={styles.condition}>{condition}</UpperText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    temperature: {
        ...theme.text.light.H3,
        color: theme.colors.onSurface,
        marginTop: 42
    },
    condition: {
        ...theme.text.normal.Body1,
        color: theme.colors.onSurface
    }
});

const getConditionDescription = (condition: wc, sky: WeatherSky) => {
    if(condition.kind !== WeatherConditionKind.None) {
        return condition.description;
    }

    return sky.kind === 'clear' ? 'clear' : 'cloudy';
}
