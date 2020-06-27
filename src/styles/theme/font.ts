import { StyleSheet } from 'react-native';

import { FontSizes } from '.';

const lightFont = {
    fontFamily: 'Rehn-Light'
}

const normalFont = {
    fontFamily: 'Rehn-Medium'
}

const boldFont = {
    fontFamily: 'Rehn-Bold'
}

const fontSize = (font: { fontFamily: string }) : FontSizes => ({
    Body1: { ...font, fontSize: 16, lineHeight: 16, height: 16 },
    Body2: { ...font, fontSize: 14, lineHeight: 14, height: 14 },
    Button: { ...font, fontSize: 14, lineHeight: 14, height: 14 },
    Caption: { ...font, fontSize: 12, lineHeight: 12, height: 12 },
    H1: { ...font, fontSize: 152, lineHeight: 152, height: 152 },
    H2: { ...font, fontSize: 60, lineHeight: 60, height: 60 },
    H3: { ...font, fontSize: 48, lineHeight: 48, height: 48 },
    H4: { ...font, fontSize: 34, lineHeight: 34, height: 34 },
    H5: { ...font, fontSize: 24, lineHeight: 24, height: 24 },
    H6: { ...font, fontSize: 20, lineHeight: 20, height: 20 }
})

export default {
    light: StyleSheet.create(fontSize(lightFont)),
    normal: StyleSheet.create(fontSize(normalFont)),
    bold: StyleSheet.create(fontSize(boldFont))
}
