import { Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Pipe({
    name: 'timeFromNow',
    // pure: false
})
export class TimeFromNowPipe implements PipeTransform {
    utcOffset: number = new Date().getTimezoneOffset() * 60;
    value: Date = new Date();
    
    transform(obj?: Date | string): Observable<string> {
        this.value = obj ? new Date(obj) : new Date();
        return this.createTimer();
    }

    private createTimer() {
        return interval(1000).pipe(
            startWith(0),
            map(() => {
                var result: string;
                // current time
                let now = new Date().getTime();
                // time since message was sent in seconds
                let delta = (now - this.value.getTime()) / 1000 + this.utcOffset;

                // format string
                if (delta < 60) { // sent in last minute
                    result = 'just now';
                } else if (delta < 3600) { // sent in last hour
                    result = Math.floor(delta / 60) + ' minutes ago';
                } else if (delta < 86400) { // sent on last day
                    result = Math.floor(delta / 3600) + ' hours ago';
                } else { // sent more than one day ago
                    result = Math.floor(delta / 86400) + ' days ago';
                }

                return result;
            })
        );
    };
}