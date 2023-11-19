import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { of } from 'rxjs';
import { generateQuote } from '../../../../test/generators/quote';

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

    protected readonly scrolled = signal(false);

    protected readonly quote$ = of(generateQuote());
}
