import { Component, computed, inject, input } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { QuoteService } from '../../../shared/services/quote.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss',
    standalone: false
})
export class BannerComponent {
    private quote = inject(QuoteService);

    altColour = input<string>('');
    backgroundUrl = input<string>('');
    backgroundFullPath = computed(() => `url(../../assets/images/${this.backgroundUrl()})`);

    protected readonly quote$ = toObservable(this.backgroundFullPath).pipe(
        filter(bgUrl => bgUrl != ''),
        switchMap(bgUrl => this.quote.unique$(bgUrl)),
    );
}