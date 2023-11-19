import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, from, of } from 'rxjs';
import { filter, map, scan, share, switchMap, take } from 'rxjs/operators';
import { generateSongs } from '../../../../test/generators/song';
import { delayInterval } from '../../../shared/operators/delay-interval';
import { SpotlightView } from '../../interfaces/spotlight-view';

@Component({
    selector: 'app-spotlight',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './spotlight.component.html',
    styleUrl: './spotlight.component.scss'
})
export class SpotlightComponent {
    private _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly songs$ = this.initialiseSongs();

    protected readonly hoverTarget = signal<SpotlightView | null>(null);

    protected buildImage(thumbnail: string, coverId: string): Observable<any> {
        return of(thumbnail);
    }

    private initialiseSongs(): Observable<SpotlightView[]> {
        const triggered$ = toObservable(this._triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return of(generateSongs()).pipe(
            switchMap(res => from(res)),
            take(9),
            map(res => ({ ...res, url: `/discography/${res.id}` })),
            delayInterval(300, triggered$),
            scan((acc, curr) => [...acc, curr], new Array<SpotlightView>()),
        );
    }
}
