import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Pipe({
    standalone: true,
    name: 'timeFromNow',
    pure: false
})
export class TimeFromNowPipe implements PipeTransform {
    value!: Date;
    timer!: Observable<string>;

    transform(obj: any): any {
        if (obj instanceof Date) {
            this.value = obj;

            var result: string;
            // current time
            let now = new Date().getTime();

            // time since message was sent in seconds
            let delta = (this.value.getTime() - now) / 1000;

            // format string
            if (delta < 60) { // sent in last minute
                result = '';
            }
            else if (delta < 3600) { // sent in last hour
                result = Math.floor(delta / 60) + ' minutes';
            }
            else if (delta < 86400) { // sent on last day
                result = Math.floor(delta / 3600) + ' hours';
            }
            else { // sent more than one day ago
                result = Math.floor(delta / 86400) + ' days';
            }

            return result;
        }

        return obj;
    }
}