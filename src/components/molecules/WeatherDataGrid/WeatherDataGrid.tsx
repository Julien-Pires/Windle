import _ from 'lodash';
import React from 'react';
import { View, StyleProp, ViewStyle } from "react-native";
import { WeatherDataGridRow } from './WeatherDataRow';
import { WeatherData } from '../../../modules/weather';

export interface WeatherDataGridProps {
    values: WeatherData[],
    style?: StyleProp<ViewStyle>
}

export const WeatherDataGrid = ({
    values,
    style
}: WeatherDataGridProps) => {
    const rows = _.chunk(values, 3).map(c => (
        <WeatherDataGridRow values={c} />
    ));
    return (
        <View style={style}>
            {rows}
        </View>
    );
}
