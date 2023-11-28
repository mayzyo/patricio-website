import { Component, Input, signal } from '@angular/core';
import { FeedItem } from '../../../models/feed-item';
import { Observable, from, of } from 'rxjs';
import { filter, map, scan, share, switchMap, take } from 'rxjs/operators';
import { generateFeed } from '../../../../test/generators/feed-item';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-upcoming-event',
    templateUrl: './upcoming-event.component.html',
    styleUrl: './upcoming-event.component.scss'
})
export class UpcomingEventComponent {
    protected readonly _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly upcomingEvents$ = this.initialiseUpcomingEvents();

    private initialiseUpcomingEvents(): Observable<FeedItem[]> {
        const triggered$ = toObservable(this._triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return of(generateFeed()).pipe(
            switchMap(res => from(res)),
            take(6),
            delayInterval(300, triggered$),
            scan((acc, curr) => [...acc, curr], new Array<FeedItem>()),
        );
    }
}
