import { DateTime } from 'luxon';
import { observable } from 'mobx';
import { interval } from 'rxjs';

export class TimeStore {
    private readonly _refreshRate = 5000;

    @observable date : DateTime = DateTime.utc();

    constructor() {
        interval(this._refreshRate).subscribe(() => {
            this.date = DateTime.utc();
        });
    }
}
