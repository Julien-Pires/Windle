import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { City, useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';
import { DateTimeDisplay, formatDate } from '../../helpers/time/dateTimeHelper';

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
        <View style={ StyleSheet.flatten([styles.container, style]) }>
            <UpperText style={ styles.city }>{ city.name }</UpperText>
            <UpperText style={ styles.date }>{ formatDate(city.date, DateTimeDisplay.DateTime) }</UpperText>
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
