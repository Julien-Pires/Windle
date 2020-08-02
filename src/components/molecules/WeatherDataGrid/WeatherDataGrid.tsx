import _ from 'lodash';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WeatherData } from '../../../modules/weather';
import { WeatherDataGridRow } from './WeatherDataGridRow';

export interface WeatherDataGridProps {
    values: WeatherData[],
    style?: StyleProp<ViewStyle>
}

export const WeatherDataGrid = ({
    values,
    style
}: WeatherDataGridProps) : JSX.Element => {
    const rows = _.chunk(values, 3).map((c, index) => (
        <WeatherDataGridRow key={`WeatherDataRow_${index}`} style={styles.row} values={c} />
    ));
    return (
        <View style={style}>
            {rows}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        marginBottom: 24
    }
});
