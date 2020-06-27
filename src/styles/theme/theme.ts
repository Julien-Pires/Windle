export interface Colors {
    surface: string,
    onSurface: string
}

export interface Font {
    fontSize: number,
    lineHeight?: number,
    height?: number
}

export interface FontSizes {
    Body1: Font,
    Body2: Font,
    Button: Font,
    Caption: Font,
    H1: Font,
    H2: Font,
    H3: Font,
    H4: Font,
    H5: Font,
    H6: Font
}

export interface Fonts {
    light: FontSizes,
    normal: FontSizes,
    bold: FontSizes
}

export interface Theme {
    colors: Colors,
    font: Fonts
}
