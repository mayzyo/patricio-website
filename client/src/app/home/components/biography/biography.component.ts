import { AfterViewInit, Component, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { delayWhen, filter, map, share } from 'rxjs/operators';
import { faEdit, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
    selector: 'app-biography',
    templateUrl: './biography.component.html',
    styleUrl: './biography.component.scss',
    standalone: false
})
export class BiographyComponent implements AfterViewInit {
    private readonly profile = new ProfileService();

    protected readonly faPortrait = faPortrait;
    protected readonly faEdit = faEdit;

    readonly triggered = input<boolean>(false);

    protected readonly biography$ = this.initialiseBiography();

    ngAfterViewInit(): void {
        this.profile.refresh();
    }

    private initialiseBiography(): Observable<string[]> {
        const triggered$ = toObservable(this.triggered).pipe(
            filter(res => res),
            map<boolean, void>(() => null),
            share()
        );

        return this.profile.biography$.pipe(
            delayWhen(() => triggered$),
        );
    }
}
