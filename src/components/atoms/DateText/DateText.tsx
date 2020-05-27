import React from 'react';
import { StyleProp, TextStyle } from "react-native";
import { DateTime, Zone } from 'luxon';
import { UpperText } from '../UpperText';

const dateFormatOptions = {
    weekday: 'long',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
}

export interface DateTextProps {
    date: DateTime,
    timezone: Zone,
    style: StyleProp<TextStyle>
}

export const DateText = ({
    date,
    timezone,
    style
}: DateTextProps) => {
    const formattedDate = date.setZone(timezone).toLocaleString(dateFormatOptions);
    return (
        <UpperText style={style}>
            {formattedDate}
        </UpperText>
    );
}