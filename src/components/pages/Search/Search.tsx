import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';

import Icons from '../../../styles/icons';
import { Page } from '../../layouts';
import { NavigationBar } from '../../molecules';
import { SearchCity } from '../../organisms/SearchCity';

export const Search = observer(({ navigation }) => {
    return (
        <Page title="search" navigationBar={navigationBar(navigation)}>
            <SearchCity style={stylesheet} />
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

const stylesheet = StyleSheet.create({
    searchBox: {
        justifyContent: 'center',
        marginTop: 24
    },
    searchInput: {
        marginLeft: 32,
        marginRight: 32
    },
    searchList: {
        marginTop: 20,
        marginLeft: 32
    }
});

