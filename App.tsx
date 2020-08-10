import 'react-native-gesture-handler';

import { AppLoading } from 'expo';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Pages from './src/components/pages';
import Parse from './src/utils/db/parse';
import { loadFonts } from './src/utils/fonts';

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    if(!dataLoaded) {
        return (
            <AppLoading
                startAsync={async() => {
                    await loadFonts();
                    Parse.initialize();
                }}
                onFinish={() => setDataLoaded(true)}>
            </AppLoading>
        );
    }

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home" 
                    component={Pages.Home} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="search" 
                    component={Pages.Search} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="settings" 
                    component={Pages.Settings} 
                    options={{ headerShown: false, gestureDirection: 'horizontal-inverted' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
