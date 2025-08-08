import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { filter, map, scan, share, switchMap } from 'rxjs/operators';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { SpotlightView } from '../../interfaces/spotlight-view';
import { SongService } from '../../../shared/services/song.service';
import { ContentService } from '../../../shared/services/content.service';

@Component({
    selector: 'app-spotlight',
    templateUrl: './spotlight.component.html',
    styleUrl: './spotlight.component.scss',
    standalone: false
})
export class SpotlightComponent {
    private song = inject(SongService);
    private content = inject(ContentService);

    triggered = input<boolean>(false);

    protected songs$ = this.initialiseSongs();
    protected hoverTarget = signal<SpotlightView | null>(null);

    private initialiseSongs(): Observable<SpotlightView[]> {
        const triggered$ = toObservable(this.triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return this.song.spotlight$.pipe(
            switchMap(res => from(res).pipe(
                map(res => ({
                    ...res,
                    cover$: this.content.getImage(res.thumbnail, res.coverId)
                })),
                delayInterval(300, triggered$),
                scan((acc, curr) => [...acc, curr], new Array<SpotlightView>()),
            )),
        );
    }
}
