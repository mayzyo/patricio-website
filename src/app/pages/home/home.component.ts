import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { fadeIn, fadeObject, landingFadeIn } from 'src/app/animations/fade-in';
import { trigger, transition, style, query, useAnimation, stagger, state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Music } from 'src/app/models/Music';
import { Update } from 'src/app/models/Update';
import { Owner } from 'src/app/models/Owner';
import { QuotesService } from 'src/app/services/quotes.service';
import { SocialMedia } from 'src/app/models/SocialMedia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(`* => true`, [
        query('.row', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
    trigger('fadeObj', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ])
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('HighlightRef', { static: true }) highlightRef: ElementRef;
  @ViewChild('UpcomingRef', { static: true }) upcomingRef: ElementRef;
  @ViewChild('BiographyRef', { static: true }) biographyRef: ElementRef;

  readonly quote$ = this.quotes.procedure$('home');

  readonly musics$ = this.http.get<Music[]>('/api/musics').pipe(
    tap(res =>
      res.forEach(el =>
        el.date && (el.date = new Date(el.date))
      )
    )
  );

  readonly updates$ = this.http.get<Update[]>(
    '/api/updates',
    { params: { page: '1', size: '4', fitler: 'event' } }
  );

  readonly biography$ = this.http.get<Owner>('/api/profile').pipe(
    pluck<Owner, SocialMedia>('socialMedia'),
    pluck<SocialMedia, string>('biography'),
  );

  highlightAnim = false;
  upcomingAnim = false;
  biographyAnim = false;

  constructor(
    private http: HttpClient,
    private quotes: QuotesService
  ) { }

  ngOnInit() {

  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event: unknown) {
    if (!this.highlightAnim && this.scrollOffset(this.highlightRef))
      this.highlightAnim = true;

    if (!this.upcomingAnim && this.scrollOffset(this.upcomingRef))
      this.upcomingAnim = true;

    if (!this.biographyAnim && this.scrollOffset(this.biographyRef))
      this.biographyAnim = true;
  }

  scrolldown() {
    this.highlightRef.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  private scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
  }
}
