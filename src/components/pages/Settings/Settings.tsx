import React from 'react';

import { observer } from 'mobx-react-lite';
import { Page } from '../../layouts';
import { NavigationBar } from '../../molecules';
import Icons from '../../../styles/icons';

export const Settings = observer(({ navigation }) => {

    return (
        <Page title="settings" navigationBar={navigationBar(navigation)}>
        </Page>
    );
});


const navigationBar = (navigation) => {
    return (
        <NavigationBar
            right={{
                icon: Icons.misc.RightArrow,
                title: 'home',
                onPress: () => {navigation.navigate('home');}
            }}
        />
    );
};
