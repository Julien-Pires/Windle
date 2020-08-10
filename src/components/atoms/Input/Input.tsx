import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, TextInput, View, ViewProps } from 'react-native';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';

export interface InputProps extends ViewProps {
    onChangeText: (text: string) => void
}

export const Input = observer((props: InputProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);
    const { onChangeText } = props;

    return (
        <View {...props}>
            <View style={styles.background}></View>
            <TextInput style={styles.input} onChangeText={onChangeText} placeholder="Enter city name..."></TextInput>
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        background: {
            height: 38,
            padding: 6,
            borderRadius: 4,
            backgroundColor: theme.colors.onSurface,
            opacity: 0.1
        },
        input: {
            ...theme.font.normal.Body1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            paddingLeft: 8,
            paddingRight: 8,
            color: theme.colors.onSurface
        }
    });
});
