import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as theme from '../../styles/default';

export const HeaderBar = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.city}>
                    San Francisco
                </Text>
            </View>
            <Text style={styles.date}>
                Mon, 1:20 am
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    city: { 
        ...theme.text.normal.H4,
        color: theme.colors.onPrimary 
    },
    date: {
        ...theme.text.normal.H6,
        color: theme.colors.onPrimaryLight,
        textAlign: 'center',
        marginTop: 8
    }
})