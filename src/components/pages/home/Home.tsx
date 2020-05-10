import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../screen';
import { TemperatureInfo } from '../../organisms/TemperatureInfo';
import { HeaderBar } from '../../organisms/HeaderBar';

export const Home = () => {
    return (
        <Screen>
            <HeaderBar></HeaderBar>
            <View style={styles.temperatureBlock}>
                <TemperatureInfo />
            </View>
            <View style={styles.forecastBlock}></View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    temperatureBlock: {
        flex: 4,
        justifyContent: 'center'
    },
    forecastBlock: {
        flex: 1 
    }
})
