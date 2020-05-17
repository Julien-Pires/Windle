import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import * as theme from '../../../styles/light';
import { CityInfo } from '../../molecules';
import { SimpleWeatherInfo } from '../../organisms';

export const Home = () => {
    return (
        <View style={styles.page}>
            <SafeAreaView>
                <CityInfo style={styles.cityInfo} />
                <SimpleWeatherInfo style={styles.weather} />
            </SafeAreaView>
        </View>
    );
}

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
