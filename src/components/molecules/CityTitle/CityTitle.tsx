import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import * as theme from '../../../styles/light';
import { UpperText } from '../../atoms';

export interface CityTitleProps {
    city: string,
    style?: StyleProp<ViewStyle>
}

export const CityTitle = ({
    city,
    style 
}: CityTitleProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <UpperText style={styles.city}>{city}</UpperText>
            <UpperText style={styles.date}>Tuesday 9:00 am</UpperText>
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
