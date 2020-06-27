import { DateTime } from 'luxon';

import { Period } from './model';

export const getPeriod = (current: DateTime, sunrise: DateTime, sunset: DateTime) : Period => {
    return current > sunrise && current < sunset ? Period.Day : Period.Night;
}
