import React from 'react';
import { View } from 'react-native';
import { Screen } from '../screen';
import { Header, HeaderSize } from '../../components/atoms/Header';

export default function Home() {
    return (
        <Screen>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{width: '20%', height: 50, backgroundColor: 'transparent'}} />
                <View style={{ width: '60%', alignItems: 'center' }}>
                    <Header title='Amsterdam' size={HeaderSize.H4} />
                </View>
                <View style={{width: '20%', height: 50, backgroundColor: 'transparent'}} />
            </View>
        </Screen>
    );
}
