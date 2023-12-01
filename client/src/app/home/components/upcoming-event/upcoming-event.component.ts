import { Component, Input, signal } from '@angular/core';
import { FeedItem } from '../../../models/feed-item';
import { Observable, from } from 'rxjs';
import { filter, map, scan, share, switchMap, take } from 'rxjs/operators';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { toObservable } from '@angular/core/rxjs-interop';
import { FeedService } from '../../../shared/services/feed.service';

@Component({
    selector: 'app-upcoming-event',
    templateUrl: './upcoming-event.component.html',
    styleUrl: './upcoming-event.component.scss'
})
export class UpcomingEventComponent {
    private readonly _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly upcomingEvents$ = this.initialiseUpcomingEvents();

    constructor(private feed: FeedService) { }

    private initialiseUpcomingEvents(): Observable<FeedItem[]> {
        const triggered$ = toObservable(this._triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return this.feed.upcoming$.pipe(
            switchMap(res => from(res).pipe(
                take(6),
                delayInterval(300, triggered$),
                scan((acc, curr) => [...acc, curr], new Array<FeedItem>()),
            )),
        );
    }
}
