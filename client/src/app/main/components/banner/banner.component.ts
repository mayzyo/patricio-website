import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { QuoteService } from '../../../shared/services/quote.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-banner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {
    protected readonly _backgroundUrl = signal('');
    @Input() set backgroundUrl(value: string) {
        this._backgroundUrl.set(`url(../../assets/images/${value})`);
    }

    protected readonly _altColour = signal('');
    @Input() set altColour(value: string) {
        this._altColour.set(value);
    }

    protected readonly quote$ = toObservable(this._backgroundUrl).pipe(
        filter(bgUrl => bgUrl != ''),
        switchMap(bgUrl => this.quote.unique$(bgUrl)),
    );

    constructor(private quote: QuoteService) { }
}
