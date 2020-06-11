import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Period } from '../../../modules/time';
import { WeatherInfo } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { SymbolDisplay, TemperatureText, UpperText, WeatherConditionIcon } from '../../atoms';

export interface WeatherConditionProps {
    weather: WeatherInfo,
    style?: StyleProp<ViewStyle>
}

export const WeatherCondition = observer(({
    weather,
    style
}: WeatherConditionProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <WeatherConditionIcon
                condition={weather.condition.kind}
                sky={weather.sky}
                period={Period.Day}
                height={190}
                width={190} />
            <TemperatureText
                style={styles.temperature}
                temperature={weather.temperature.current}
                display={SymbolDisplay.Full} />
            <UpperText style={styles.condition}>{weather.condition.description}</UpperText>
        </View>
    );
})

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        container: {
            alignItems: 'center'
        },
        temperature: {
            ...theme.font.light.H3,
            color: theme.colors.onSurface,
            marginTop: 42
        },
        condition: {
            ...theme.font.normal.Body1,
            color: theme.colors.onSurface
        }
    });
});
