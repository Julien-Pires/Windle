import { StyleSheet } from 'react-native';

const lightFont = {
    fontFamily: 'Roboto-Thin'
}

const normalFont = {
    fontFamily: 'Roboto-Light'
}

const fontSize = (font: { fontFamily: string }) => ({
    Body1: { ...font, fontSize: 16 },
    Body2: { ...font, fontSize: 14 },
    Button: { ...font, fontSize: 14 },
    Caption: { ...font, fontSize: 12 },
    H1: { ...font, fontSize: 152 },
    H2: { ...font, fontSize: 60 },
    H3: { ...font, fontSize: 48 },
    H4: { ...font, fontSize: 34 },
    H5: { ...font, fontSize: 24 },
    H6: { ...font, fontSize: 20 }
})

export const text = {
    light: StyleSheet.create(fontSize(lightFont)),
    normal: StyleSheet.create(fontSize(normalFont))
}
