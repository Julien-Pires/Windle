import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { useStores } from '../../../stores';
import { Theme } from '../../../styles/theme';
import { Icon, UpperText } from '../../atoms';

export interface NavigationBarItemProps {
    icon: React.FC<SvgProps>,
    onPress: (event: GestureResponderEvent) => void,
    title?: string
}

export interface NavigationBarProps {
    left?: NavigationBarItemProps,
    right?: NavigationBarItemProps
}

export const NavigationBar = observer(({
    left,
    right
}: NavigationBarProps) => {
    const { UIStore } = useStores();
    const styles = stylesheet(UIStore.theme);

    return (
        <View style={styles.container}>
            <View style={styles.leftItem}>
                {   left && 
                    <NavigationBarItem 
                        position='left'
                        title={left.title}
                        icon={left.icon}
                        onPress={left.onPress}
                        theme={UIStore.theme} /> 
                }
            </View>
            <View style={styles.rightItem}>
                { 
                    right && 
                    <NavigationBarItem 
                        position='right'
                        title={right.title}
                        icon={right.icon}
                        onPress={right.onPress}
                        theme={UIStore.theme} />
                }
            </View>
        </View>
    );
});

const stylesheet = _.memoize((theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        leftItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 22
        },
        rightItem: {
            marginRight: 22
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        label: {
            ...theme.font.normal.Body2,
            color: theme.colors.onSurface,
            marginLeft: 12,
            marginRight: 12
        }
    });
});

const NavigationBarItem = (
    props: NavigationBarItemProps & {
        position: 'left' | 'right', 
        theme: Theme 
    }) => {
    const { position, title, icon, onPress, theme } = props;
    const styles = stylesheet(theme);

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            {
                title && position === 'right' && 
                <UpperText style={styles.label}>{title}</UpperText> 
            }
            <Icon width={26} height={26} fill={theme.colors.onSurface} icon={icon} />
            {
                title && position === 'left' && 
                <UpperText style={styles.label}>{title}</UpperText> 
            }
        </TouchableOpacity>
    );
};
