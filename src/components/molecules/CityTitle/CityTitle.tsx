import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { DateTime } from 'luxon';
import * as theme from '../../../styles/light';
import { DateTimeText, UpperText, DateTimeDisplay } from '../../atoms';
import { City } from '../../../modules/weather';

export interface CityTitleProps {
    city: City,
    date: DateTime,
    style?: StyleProp<ViewStyle>
}

export const CityTitle = ({
    city,
    date,
    style
}: CityTitleProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <UpperText style={styles.city}>{city.name}</UpperText>
            <DateTimeText 
                style={styles.date} 
                date={date} 
                display={DateTimeDisplay.DateTime} />
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
