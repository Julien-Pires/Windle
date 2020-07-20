import _ from 'lodash';
import React from 'react';

import { observer } from 'mobx-react-lite';
import { Page } from '../../layouts';
import { NavigationBar } from '../../molecules';
import Icons from '../../../styles/icons';

export const Search = observer(({navigation}) => {

    return (
        <Page title="search" navigationBar={navigationBar(navigation)}>
        </Page>
    );
});


const navigationBar = (navigation) => {
    return (
        <NavigationBar
            left={{
                icon: Icons.misc.LeftArrow,
                title: 'home',
                onPress: _ => {navigation.navigate('home')}
            }}
        />
    );
}
