import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { QuoteService } from '../../../shared/services/quote.service';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-landing-banner',
    templateUrl: './landing-banner.component.html',
    styleUrl: './landing-banner.component.scss',
    standalone: false
})
export class LandingBannerComponent {
    private quote = inject(QuoteService);
    private scrollAnchor = viewChild<ElementRef<HTMLElement>>('ScrollAnchor');

    arrowDisabled = input<boolean>(false);
    scrolldownChange = output<void>();

    protected readonly faArrowDown = faArrowDown;
    protected readonly quote$ = this.quote.unique$('landing').pipe(delay(1000));
  
    protected scrolldown(): void {
        this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.scrolldownChange.emit();
    }
}
