import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FamousQuoteService } from '../famous-quote.service';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { transition, trigger, useAnimation } from '@angular/animations';
import { cueAnimation } from '../cue.animation';
import metaData from 'src/meta-data';
import { interval, Observable, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

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
export class LandingBannerComponent implements OnInit, OnDestroy {
  readonly faAngleDoubleDown = faAngleDoubleDown;
  readonly backgroundUrl: string = `--bg: url(${metaData.homeBannerUrl})`;
  readonly subscriptions = new Subscription();

  quote = this.famousQuotes.random();
  cueActive$: Observable<boolean> = interval(5000).pipe(
    map(res => res % 2 == 0),
    takeWhile(() => isPlatformBrowser(this.platformId))
  );
  headerOffset: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private breakpointObserver: BreakpointObserver, public famousQuotes: FamousQuoteService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver
      .observe('(min-width: 1024px)')
      .subscribe(res => this.headerOffset = res.matches ? 0 : 88)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  scrollDown() {
    window.scroll({
      top: window.innerHeight - this.headerOffset,
      left: 0,
      behavior: 'smooth'
    });
  }
}
