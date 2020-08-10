import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import { UpperText } from '../UpperText';

export interface TextHighlightProps {
    text: string,
    prefix: string,
    style?: StyleProp<TextStyle>
}

export const TextHighlight = ({
    text,
    prefix,
    style
}: TextHighlightProps): JSX.Element => {
    return (
        <View style={stylesheet.container}>
            <UpperText style={StyleSheet.compose(style, stylesheet.leftPart)}>
                {prefix}
            </UpperText>
            <UpperText style={StyleSheet.compose(style, stylesheet.rightPart)}>
                {text.substring(prefix.length, text.length)}
            </UpperText>
        </View>
    );
};

const stylesheet = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    leftPart: {
        opacity: 1
    },
    rightPart: {
        opacity: 0.6
    }
});
