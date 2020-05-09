import { StyleSheet } from 'react-native';

const textStyle = {
    color: 'white',
    fontFamily: 'roboto'
}

export const headers = StyleSheet.create({
    H1: {
        ...textStyle,
        fontSize: 96
    },
    H2: {
        ...textStyle,
        fontSize: 60
    },
    H3: {
        ...textStyle,
        fontSize: 48
    },
    H4: {
        ...textStyle,
        fontSize: 34
    },
    H5: {
        ...textStyle,
        fontSize: 24
    },
    H6: {
        ...textStyle,
        fontSize: 20
    },
});
