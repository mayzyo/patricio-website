import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { QuoteService } from '../../../shared/services/quote.service';

@Component({
    selector: 'app-landing-banner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './landing-banner.component.html',
    styleUrl: './landing-banner.component.scss'
})
export class LandingBannerComponent {
    @ViewChild('ScrollAnchor', { static: true }) scrollAnchor?: ElementRef<HTMLElement>;

    protected readonly _arrowDisabled = signal(false);
    @Input() set arrowDisabled(value: boolean) {
        this._arrowDisabled.set(value);
    }
    @Output() scrolldownChange = new EventEmitter<void>();

    protected readonly faArrowDown = faArrowDown;
    protected readonly quote$ = this.quote.unique$('landing');
  
    constructor(private quote: QuoteService) { }
  
    protected scrolldown(): void {
        this.scrollAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        this.scrolldownChange.emit();
    }
}
