import { DateTime } from "luxon";

export enum DateTimeDisplay {
    DateTime,
    Time
}

export class TimeHelper {
    private static readonly dateFormatOptions = {
        weekday: 'long',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }
    
    private static readonly timeFormatOptions = {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }

    static format(date: DateTime, display: DateTimeDisplay) {
        const formatOptions = display === DateTimeDisplay.DateTime ? this.dateFormatOptions : this.timeFormatOptions;

        return date.toLocaleString(formatOptions);
    }
}
