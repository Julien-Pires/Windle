import { observable } from 'mobx';
import { interval } from 'rxjs';
import { DateTime } from 'luxon';

const refreshRate = 5000;

export class SystemStore {
    @observable date : DateTime = DateTime.utc();

    constructor() {
        interval(refreshRate).subscribe(_ => {
            this.date = DateTime.utc();
        });
    }
}
