import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { UpperText } from '../../atoms';

export interface DividerTitleProps {
    children: string,
    style?: StyleProp<ViewStyle>
}

export const DividerTitle = observer(({
    children,
    style
}: DividerTitleProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={StyleSheet.compose(style, styles.container)}>
            <UpperText style={styles.title}>{children}</UpperText>
            <View style={styles.divider} />
        </View>
    );
})

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            ...theme.font.bold.Body1,
            color: theme.colors.onSurface
        },
        divider: {
            flex: 1,
            height: 1,
            marginLeft: 8,
            marginRight: 32,
            backgroundColor: theme.colors.onSurface
        }
    });
})
