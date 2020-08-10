import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View } from 'react-native';

import { getCity } from '../../../modules/city';
import { City } from '../../../modules/city/types';
import Icons from '../../../styles/icons';
import { Page } from '../../layouts';
import { NavigationBar } from '../../molecules';
import { SearchCity } from '../../organisms/SearchCity';

export const Search = observer(({ navigation }) => {
    return (
        <Page title="search" navigationBar={navigationBar(navigation)}>
            <SearchCity />
        </Page>
    );
});

const navigationBar = (navigation) => {
    return (
        <NavigationBar
            left={{
                icon: Icons.misc.LeftArrow,
                title: 'home',
                onPress: () => {navigation.navigate('home');}
            }}
        />
    );
};

const renderItem = (city: City) => {
    return (
        <View>
            <Text>{city.name}</Text>
        </View>
    );
};
