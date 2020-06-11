import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { City, useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { DateTimeDisplay, DateTimeText, UpperText } from '../../atoms';

export interface CityTitleProps {
    city: City,
    style?: StyleProp<ViewStyle>
}

export const CityTitle = observer(({
    city,
    style
}: CityTitleProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={StyleSheet.flatten([styles.container, style])}>
            <UpperText style={styles.city}>{city.name}</UpperText>
            <DateTimeText 
                style={styles.date} 
                date={city.date} 
                display={DateTimeDisplay.DateTime} />
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        container: {
            alignItems: 'center'
        },
        city: {
            ...theme.font.bold.H5,
            color: theme.colors.onSurface
        },
        date: {
            ...theme.font.normal.H6,
            color: theme.colors.onSurface
        }
    });
});
