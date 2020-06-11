import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WeatherInfo } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Divider } from '../../atoms';
import { WeatherCondition, WeatherDataGrid } from '../../molecules';

export interface SimpleWeatherInfoProps {
    weather: WeatherInfo,
    style: StyleProp<ViewStyle>
}

export const SimpleWeatherInfo = observer(({
    weather,
    style
}: SimpleWeatherInfoProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={style}>
            <WeatherCondition weather={weather} />
            <Divider style={styles.divider} />
            <WeatherDataGrid values={[
                weather.temperature.min,
                weather.sky.wind,
                weather.temperature.max
            ]} />
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {    
    return StyleSheet.create({
        divider: {
            height: 1,
            width: 40,
            marginTop: 34,
            marginBottom: 34,
            alignSelf: 'center',
            backgroundColor: theme.colors.onSurface
        }
    });
});
