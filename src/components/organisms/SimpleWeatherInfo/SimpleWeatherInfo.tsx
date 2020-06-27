import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Weather } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Divider } from '../../atoms';
import { WeatherCondition, WeatherDataGrid } from '../../molecules';

export interface SimpleWeatherInfoProps {
    weather: Weather,
    style?: StyleProp<ViewStyle>
}

export const SimpleWeatherInfo = observer(({
    weather,
    style
}: SimpleWeatherInfoProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={style}>
            <WeatherCondition weather={weather.current} />
            <Divider style={styles.divider} />
            <WeatherDataGrid values={[
                weather.today.minTemperature,
                weather.today.maxTemperature,
                weather.current.wind.speed
            ]} />
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {    
    return StyleSheet.create({
        divider: {
            height: 1,
            width: 40,
            marginTop: 46,
            marginBottom: 46,
            alignSelf: 'center',
            backgroundColor: theme.colors.onSurface
        }
    });
});
