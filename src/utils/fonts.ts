import * as Font from 'expo-font';

export const loadFonts = () => {
    return Font.loadAsync({
        'roboto': require('../../assets/fonts/Roboto-Light.ttf')
    });
};