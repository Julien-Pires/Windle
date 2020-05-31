import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import * as theme from '../../../styles/light';
import { UpperText } from '../../atoms';
import { CityTitle } from '../../molecules';
import { SimpleWeatherInfo } from '../../organisms';
import { useStores } from '../../../hooks';

export const Home = observer(() => {
    const { system, weatherStore } = useStores();

    if(weatherStore.weather) {
        return (
            <View style={styles.page}>
                <SafeAreaView>
                    <CityTitle
                        style={styles.cityInfo}
                        city={weatherStore.weather.city}
                        date={system.date.setZone(weatherStore.weather.city.timezone)} />
                    <SimpleWeatherInfo style={styles.weather} weather={weatherStore.weather} />
                </SafeAreaView>
            </View>
        );
    } else {
        return (
            <View style={styles.page}>
                <SafeAreaView>
                    <UpperText>No weather</UpperText>
                </SafeAreaView>
            </View>
        );
    }
})

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.colors.surface
    },
    cityInfo: {
        marginTop: 52
    },
    weather: {
        marginTop: 34
    }
})
