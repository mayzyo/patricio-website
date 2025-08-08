import { Component, inject, input } from '@angular/core';
import { FeedItem } from '../../../models/feed-item';
import { Observable, from } from 'rxjs';
import { filter, map, scan, share, switchMap, take } from 'rxjs/operators';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { toObservable } from '@angular/core/rxjs-interop';
import { FeedService } from '../../../shared/services/feed.service';

@Component({
    selector: 'app-upcoming-event',
    templateUrl: './upcoming-event.component.html',
    styleUrl: './upcoming-event.component.scss',
    standalone: false
})
export class UpcomingEventComponent {
    private feed = inject(FeedService);
    triggered = input<boolean>(false);

    protected upcomingEvents$ = this.initialiseUpcomingEvents();

    private initialiseUpcomingEvents(): Observable<FeedItem[]> {
        const triggered$ = toObservable(this.triggered).pipe(
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
