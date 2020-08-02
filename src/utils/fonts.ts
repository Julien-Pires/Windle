import * as Font from 'expo-font';

export const loadFonts = () : Promise<void> => {
    return Font.loadAsync({
        'Rehn-Light': require('../../assets/fonts/Rehn/Rehn-Light.ttf'),
        'Rehn-Medium': require('../../assets/fonts/Rehn/Rehn-Medium.ttf'),
        'Rehn-Bold': require('../../assets/fonts/Rehn/Rehn-Bold.ttf')
    });
};
