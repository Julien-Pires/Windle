import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';

import { useStores } from '../../stores';
import { Theme } from '../../styles/theme';
import { UpperText } from '../atoms';

export interface PageProps extends ViewProps {
    children?: React.ReactNode,
    navigationBar: React.ReactNode,
    title: string | React.ReactNode
}

export const Page = observer(({
    children,
    navigationBar,
    title
}: PageProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    let titleNode : React.ReactNode = title;
    if(typeof title === 'string') {
        titleNode = (<UpperText style={styles.titleText}>{title}</UpperText>)
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.navigationBar}>{navigationBar}</View>
            <View style={styles.title}>{titleNode}</View>
            {children}
        </SafeAreaView>
    );
});

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.colors.surface
        },
        navigationBar: {
            height: 42,
            marginTop: 16
        },
        title: {
            marginTop: 16
        },
        titleText: {
            ...theme.font.bold.H5,
            color: theme.colors.onSurface,
            textAlign: 'center'
        }
    });
});
