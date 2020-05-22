import _ from 'lodash';
import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import * as theme from '../../../styles/light';
import DayTime from '../../../../assets/icons/weather/lineal/daytime.svg';
import { Divider } from '../../atoms';

interface WeatherGridItemProps {
    title: string,
    value: string
}

interface WeatherGridRowProps {
    values: string[]
}

export interface WeatherGridProps {
    values: string[],
    style?: StyleProp<ViewStyle>
}

const WeatherGridItem = ({
    title,
    value 
}: WeatherGridItemProps) => {
    return (
        <View style={styles.item}>
            <DayTime style={styles.icon} fill={theme.colors.onSurface}></DayTime>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const WeatherGridRow = ({ 
    values
}: WeatherGridRowProps) => {
    const items = values.flatMap(c => [ 
        (<WeatherGridItem title='SUNRISE' value={c} />),
        (<Divider style={styles.divider} />)
    ]);
    
    if(items.length > 2) {
        items.pop();
    }

    return (
        <View style={styles.row}>
            {items}
        </View>
    );
}

export const WeatherInfoGrid = ({
    values,
    style
}: WeatherGridProps) => {
    const rows = _.chunk(values, 3).map(c => (
        <WeatherGridRow values={c} />
    ));
    return (
        <View style={style}>
            {rows}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    item: {
        alignItems: 'center',
    },
    icon: {
        height: 24,
        width: 24,
        marginBottom: 18,
        color: theme.colors.onSurface
    },
    title: {
        ...theme.text.light.Body2,
        color: theme.colors.onSurface,
    },
    value: {
        ...theme.text.normal.H6,
        color: theme.colors.onSurface
    },
    divider: {
        alignSelf: 'center',
        height: 28,
        width: 1,
        backgroundColor: theme.colors.onSurface
    }
});
