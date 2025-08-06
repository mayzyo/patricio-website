import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, from } from 'rxjs';
import { filter, map, scan, share, switchMap } from 'rxjs/operators';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { SpotlightView } from '../../interfaces/spotlight-view';
import { SongService } from '../../../shared/services/song.service';
import { ContentService } from '../../../shared/services/content.service';

@Component({
    selector: 'app-spotlight',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './spotlight.component.html',
    styleUrl: './spotlight.component.scss',
    standalone: false
})
export class SpotlightComponent {
    private _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly songs$ = this.initialiseSongs();

    protected readonly hoverTarget = signal<SpotlightView | null>(null);

    constructor(private song: SongService, private content: ContentService) { }

    private initialiseSongs(): Observable<SpotlightView[]> {
        const triggered$ = toObservable(this._triggered).pipe(
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
