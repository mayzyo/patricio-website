import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { delayWhen, map } from 'rxjs/operators';
import { faEdit, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { generateProfile } from '../../../../test/generators/profile';
import { Profile } from '../../../models/profile';

@Component({
    selector: 'app-biography',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './biography.component.html',
    styleUrl: './biography.component.scss'
})
export class BiographyComponent {
    private _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly faPortrait = faPortrait;
    protected readonly faEdit = faEdit;

    protected readonly english$: Observable<string>;
    protected readonly chinese$: Observable<string>;

    constructor() {
        const profile$ = of(generateProfile());
        const triggered$ = toObservable(this._triggered);
        this.english$ = this.initialiseEnglish(triggered$, profile$);
        this.chinese$ = this.initialiseChinese(triggered$, profile$);
    }

    private initialiseEnglish(triggered$: Observable<boolean>, profile$: Observable<Profile>): Observable<string> {
        return profile$.pipe(
            map(({ biographyEn }) => biographyEn),
            delayWhen(() => triggered$),
        );
    }

    private initialiseChinese(triggered$: Observable<boolean>, profile$: Observable<Profile>): Observable<string> {
        return profile$.pipe(
            map(({ biographyCh }) => biographyCh),
            delayWhen(() => triggered$),
        );
    }
}
