import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import { useStores } from '../../../stores';
import Icons from '../../../styles/icons';
import { Theme } from '../../../styles/theme';
import { Page } from '../../layouts';
import { CityTitle, NavigationBar } from '../../molecules';
import { DetailedWeatherInfo, SimpleWeatherInfo, WeeklyWeatherInfo } from '../../organisms';

export const Home = observer(({ navigation }) => {
    const { dataStore, UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    
    const navigationBar = (
        <NavigationBar
            left={{
                icon: Icons.misc.Gear,
                onPress: _ => {navigation.navigate('settings')}
            }}
            right={{
                icon: Icons.misc.AddPin,
                onPress: _ => {navigation.navigate('search')}
            }}
        />
    );

    if(!dataStore.weather.weather || !dataStore.weather.city) {
        return (
            <Page title="No Weather" navigationBar={navigationBar}></Page>
        );
    }

    const title = <CityTitle city={dataStore.weather.city} />;

    return (
        <Page style={styles.page} title={title} navigationBar={navigationBar}>
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
        </Page>
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
        slideContainer: {
            marginTop: 32
        }
    });
});
