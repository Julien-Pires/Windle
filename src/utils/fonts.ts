import * as Font from 'expo-font';

export const loadFonts = () => {
    return Font.loadAsync({
        'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf')
    });
};