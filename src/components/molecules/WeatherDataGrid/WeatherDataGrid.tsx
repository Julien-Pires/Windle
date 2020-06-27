import _ from 'lodash';
import React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';

import { WeatherData } from '../../../modules/weather';
import { WeatherDataGridRow } from './WeatherDataRow';

export interface WeatherDataGridProps {
    values: WeatherData[],
    style?: StyleProp<ViewStyle>
}

export const WeatherDataGrid = ({
    values,
    style
}: WeatherDataGridProps) => {
    const rows = _.chunk(values, 3).map(c => (
        <WeatherDataGridRow style={styles.row} values={c} />
    ));
    return (
        <View style={style}>
            {rows}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 24
    }
});
