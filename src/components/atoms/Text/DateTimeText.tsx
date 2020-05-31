import React from 'react';
import { StyleProp, TextStyle } from "react-native";
import { DateTime, Zone } from 'luxon';
import { UpperText } from './UpperText';

export enum DateTimeDisplay {
    DateTime,
    Time
}

export interface DateTimeTextProps {
    date: DateTime,
    display: DateTimeDisplay,
    style: StyleProp<TextStyle>
}

export const DateTimeText = ({
    date,
    display,
    style
}: DateTimeTextProps) => {
    const formatOptions = display === DateTimeDisplay.DateTime ? dateFormatOptions : timeFormatOptions;
    const formattedDate = date.toLocaleString(formatOptions);

    return (
        <UpperText style={style}>
            {formattedDate}
        </UpperText>
    );
}

const dateFormatOptions = {
    weekday: 'long',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
}

const timeFormatOptions = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
}
