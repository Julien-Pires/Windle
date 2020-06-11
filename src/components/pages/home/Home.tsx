import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';
import { CityTitle } from '../../molecules';
import { SimpleWeatherInfo } from '../../organisms';

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
        <View style={styles.page}>
            <SafeAreaView>
                <CityTitle
                    style={styles.cityInfo}
                    city={dataStore.weather.city} />
                <SimpleWeatherInfo 
                    style={styles.weather} 
                    weather={dataStore.weather.weather} />
            </SafeAreaView>
        </View>
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
            marginTop: 34
        }
    });
});
