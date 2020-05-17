import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as theme from '../../../styles/light';

export interface CityInfoProps {
    style?: StyleProp<ViewStyle>
}

export const CityInfo = ({ style }: CityInfoProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <Text style={styles.city}>PARIS</Text>
            <Text style={styles.date}>TUESDAY 9:00 AM</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    city: {
        ...theme.text.bold.H5,
        color: theme.colors.onSurface
    },
    date: {
        ...theme.text.normal.H6,
        color: theme.colors.onSurface
    }
});
