import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';
import { CityTitle } from '../../molecules';
import { SimpleWeatherInfo, DetailedWeatherInfo } from '../../organisms';

export const Home = observer(() => {
    const { dataStore, UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    
    if(!dataStore.weather.weather || !dataStore.weather.city) {
        return (
            <View>
                <SafeAreaView>
                    <UpperText>No weather</UpperText>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.page}>
            <CityTitle
                style={styles.cityInfo}
                city={dataStore.weather.city} />
            <Swiper showsPagination={false} loop={false}>
                <SimpleWeatherInfo
                    style={styles.weather}
                    weather={dataStore.weather.weather} />
                <DetailedWeatherInfo
                    style={styles.weather}
                    weather={dataStore.weather.weather} />
            </Swiper>
        </SafeAreaView>
    );
})

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.colors.surface
        },
        cityInfo: {
            marginTop: 52
        },
        weather: {
            marginTop: 48
        }
    });
});
