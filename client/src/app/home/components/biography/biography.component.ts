import { AfterViewInit, ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { delayWhen, filter, map, share } from 'rxjs/operators';
import { faEdit, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
    selector: 'app-biography',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './biography.component.html',
    styleUrl: './biography.component.scss',
    standalone: false
})
export class BiographyComponent implements AfterViewInit {
    protected readonly faPortrait = faPortrait;
    protected readonly faEdit = faEdit;

    private _triggered = signal(false);
    @Input() set triggered(value: boolean) {
        this._triggered.set(value);
    }

    protected readonly biography$ = this.initialiseBiography();

    constructor(private profile: ProfileService) { }

    ngAfterViewInit(): void {
        this.profile.refresh();
    }

    private initialiseBiography(): Observable<string[]> {
        const triggered$ = toObservable(this._triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return this.profile.biography$.pipe(
            delayWhen(() => triggered$),
        );
    }
}
