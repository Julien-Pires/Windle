import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../screen';
import { Header, HeaderSize } from '../../components/atoms/Header';
import { WeatherInfo, getCurrentWeather } from '../../modules/weather';
import { toMetrics } from '../../modules/weather/metrics';

export default function Home() {
    const [weather, setWeather] = useState<WeatherInfo | undefined>();

    // useEffect(() => {
    //     getCurrentWeather('Amsterdam').then(c => setWeather(c));
    // }, []);

    return (
        <Screen>
            <View style={{ flex: 0, flexDirection: 'row' }}>
                <View style={{width: '20%', height: 50, backgroundColor: 'transparent'}} />
                <View style={{ width: '60%', alignItems: 'center' }}>
                    <Header title={weather ? weather.city : 'No'} size={HeaderSize.H4} />
                </View>
                <View style={{width: '20%', height: 50, backgroundColor: 'transparent'}} />
            </View>
            <View
                style={{
                    backgroundColor: 'orange',
                    height: 100
                }}
            >
                <Text>{`Temperature ${toMetrics(weather ? weather.temperature : 0)}`}</Text>
            </View>
        </Screen>
    );
}
