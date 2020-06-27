import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WeatherData } from '../../../modules/weather';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Divider } from '../../atoms';
import { WeatherDataItem } from './WeatherDataItem';

export interface WeatherDataGridRowProps {
    values: WeatherData[],
    style?: StyleProp<ViewStyle>
}

export const WeatherDataGridRow = observer(({ 
    values,
    style
}: WeatherDataGridRowProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const items = values.flatMap(c => [ 
        (<WeatherDataItem style={styles.item} data={c} />),
        (<Divider style={styles.divider} />)
    ]);
    
    if(items.length > 2) {
        items.pop();
    }

    return (
        <View style={StyleSheet.compose(style, styles.row)}>
            {items}
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        row: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        item: {
            flex: 1,
        },
        divider: {
            alignSelf: 'center',
            height: 28,
            width: 1,
            backgroundColor: theme.colors.onSurface
        }
    });
});
