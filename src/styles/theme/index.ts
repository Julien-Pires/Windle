import { default as dark } from './dark';
import { default as light } from './light';
import font from './font';
import { Theme } from './theme';

export const lightTheme : Theme = {
    ...light,
    font: font
}

export const darkTheme : Theme = {
    ...dark,
    font: font
}

export * from './theme';
