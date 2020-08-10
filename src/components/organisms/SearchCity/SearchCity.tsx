import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { getCity } from '../../../modules/city';
import { City } from '../../../modules/city/types';
import { Theme } from '../../../styles/theme';
import { SearchBox } from '../../molecules';
import { useStores } from '../../../stores';
import { UpperText } from '../../atoms';

export const SearchCity = observer(() => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <SearchBox throttle={260} getData={async (text) => await getCity(text)}>
            <FlatList data={[]} renderItem={({ item }) => CityNameLabel(item, styles.cityLabel)} />
        </SearchBox>
    );
});

const CityNameLabel = (city: City, style: any) => {
    return (
        <UpperText style={style.cityLabel}>{ `${city.name}, ${city.country.name}` }</UpperText>
    );
};

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        cityLabel: {
            ...theme.font.normal.Body1,
            color: theme.colors.onSurface
        }
    });
});
