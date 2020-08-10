import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { getCity } from '../../../modules/city';
import { City } from '../../../modules/city/types';
import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { TextHighlight } from '../../atoms';
import { SearchBox, SearchBoxStyle } from '../../molecules';

export interface SearchCityProps {
    style: SearchBoxStyle & {
        searchList: StyleProp<ViewStyle>
    }
}

export const SearchCity = observer(({
    style
}: SearchCityProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <SearchBox 
            style={style}
            throttle={260} 
            getData={async (text) => await getCity(text)}>
            <CityList style={{ ...styles, ...style }}/>
        </SearchBox>
    );
});

const CityList = ({
    data,
    input,
    style
}: { 
    style: {
        cityLabel: StyleProp<TextStyle>,
        itemContainer: StyleProp<ViewStyle>,
        searchList: StyleProp<ViewStyle>,
    },
    data?: City[], 
    input?: string
}) => {
    return (
        <FlatList style={style.searchList} data={data} renderItem={({ item }) => {
            return (
                <TouchableOpacity style={style.itemContainer}>
                    <TextHighlight 
                        style={style.cityLabel} 
                        text={ `${item.name}, ${item.country.name}` } 
                        prefix={input ?? ''} />
                </TouchableOpacity>
            );
        }} />
    );
};

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        itemContainer: {
            marginTop: 10,
            marginBottom: 10
        },
        cityLabel: {
            ...theme.font.normal.Body1,
            color: theme.colors.onSurface
        }
    });
});
