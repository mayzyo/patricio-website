import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/quote';
import { QuotesService } from 'src/app/shared/services/quotes.service';

@Component({
  selector: 'app-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.scss']
})
export class LandingBannerComponent {
  @Input() disabled: boolean = true;
  @Output() scrolldownChange = new EventEmitter();

  protected readonly quote$ : Observable<Quote>;
  protected readonly faArrowDown = faArrowDown;

  constructor(quotes: QuotesService) {
    this.quote$ = quotes.unique$('home');
  }

  scrolldown() {
    this.scrolldownChange.emit();
  }
}
