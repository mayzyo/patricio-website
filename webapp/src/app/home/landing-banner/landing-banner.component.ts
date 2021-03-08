import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FamousQuoteService } from '../famous-quote.service';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { transition, trigger, useAnimation } from '@angular/animations';
import { cueAnimation } from '../cue.animation';
import metaData from 'src/meta-data';
import { interval, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-banner',
  templateUrl: './landing-banner.component.html',
  animations: [
    trigger('cue', [
      transition('* => true', useAnimation(cueAnimation))
    ])
  ],
  styleUrls: ['./landing-banner.component.scss']
})
export class LandingBannerComponent implements OnInit {
  readonly faAngleDoubleDown = faAngleDoubleDown;
  readonly backgroundUrl: string = `--bg: url(${metaData.homeBannerUrl})`;

  quote = this.famousQuotes.random();
  cueActive$: Observable<boolean> = interval(5000)
    .pipe(
      map(res => res % 2 == 0),
      takeWhile(() => isPlatformBrowser(this.platformId))
    );

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public famousQuotes: FamousQuoteService) { }

  ngOnInit(): void {
  }

  scrollDown() {
    window.scroll({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
