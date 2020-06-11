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

export default {
    light: StyleSheet.create(fontSize(lightFont)),
    normal: StyleSheet.create(fontSize(normalFont)),
    bold: StyleSheet.create(fontSize(boldFont))
}
