import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as theme from '../../../styles/light';
import { WeatherData } from "../../../modules/weather";
import { WeatherDataItem } from "./WeatherDataItem";
import { Divider } from "../../atoms";

export interface WeatherDataGridRowProps {
    values: WeatherData[]
}

export const WeatherDataGridRow = ({ 
    values
}: WeatherDataGridRowProps) => {
    const items = values.flatMap(c => [ 
        (<WeatherDataItem data={c} />),
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

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    divider: {
        alignSelf: 'center',
        height: 28,
        width: 1,
        backgroundColor: theme.colors.onSurface
    }
});
