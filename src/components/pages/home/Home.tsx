import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';
import { CityTitle } from '../../molecules';
import { SimpleWeatherInfo, DetailedWeatherInfo, WeeklyWeatherInfo } from '../../organisms';

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
            <Swiper
                showsPagination={true}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                paginationStyle={styles.pagination}
                loop={false}>
                <SimpleWeatherInfo
                    style={styles.slideContainer}
                    weather={dataStore.weather.weather} />
                <DetailedWeatherInfo
                    style={styles.slideContainer}
                    weather={dataStore.weather.weather} />
                <WeeklyWeatherInfo
                    style={styles.slideContainer}
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
        pagination: {
            bottom: 12
        },
        dot: {
            backgroundColor: theme.colors.onSurface,
            opacity: 0.4,
            height: 6,
            width: 6
        },
        activeDot: {
            backgroundColor: theme.colors.onSurface,
            height: 6,
            width: 6
        },
        cityInfo: {
            marginTop: 52
        },
        slideContainer: {
            marginTop: 48
        }
    });
});
