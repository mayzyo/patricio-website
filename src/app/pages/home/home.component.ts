import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { map, pluck, delayWhen, filter, share, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/models/Owner';
import { QuotesService } from 'src/app/services/quotes.service';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { AdminService } from 'src/app/services/admin.service';
import { Observable, Subject, of } from 'rxjs';
import { Highlight } from 'src/app/components/highlight/highlight.component';
import { Listing } from 'src/app/components/listing/listing.component';
import { MusicService } from 'src/app/services/music.service';
import { UpdateService, Filter } from 'src/app/services/update.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('HighlightRef', { static: true }) highlightRef: ElementRef;
  @ViewChild('UpcomingRef', { static: true }) upcomingRef: ElementRef;
  @ViewChild('BiographyRef', { static: true }) biographyRef: ElementRef;

  readonly quote$ = this.quotes.unique$('home');
  readonly highlight$: Observable<Highlight> = this.musics.favourite$.pipe(
    map(res => ({ ...res, image$: res.cover$, subtitle: res.genre }))
  );
  readonly upcoming$: Observable<Listing> = this.updates.filtered$(Filter.EVENT).pipe(
    filter(res => res.date > new Date()),
    share()
  );

  readonly biography$ = this.http.get<Owner>('/api/profile').pipe(
    pluck<Owner, SocialMedia>('socialMedia'),
    pluck<SocialMedia, string>('biography'),
    map(res => {
      const cutoff = this.languageCut(res)
      return cutoff != -1
      ? [res.slice(0, cutoff), res.slice(cutoff, res.length)]
      : [res]
    }),
    delayWhen(() => this.biographyTrigger$),
    /** DelayWhen will not hold back interval() when used with Subject,
    therefore can only work here and not in the other components. */
  );

  // Boolean because it is used to trigger the disabling of arrow down in banner-landing component
  highlightTrigger$ = new Subject<boolean>();
  listingTrigger$ = new Subject();
  biographyTrigger$ = new Subject();

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private musics: MusicService,
    private updates: UpdateService,
    private admin: AdminService,
  ) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event: unknown) {
    if (this.scrollOffset(this.highlightRef))
      this.highlightTrigger$.next(true);
    if (this.scrollOffset(this.upcomingRef))
      this.listingTrigger$.next();
    if (this.scrollOffset(this.biographyRef))
      this.biographyTrigger$.next();
  }

  scrolldown() {
    this.highlightRef.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }

  private scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
  }

  private languageCut(msg: string) {
    for (var i = 0, n = msg.length; i < n; i++) {
      // Chinese characters are above the 30,000 range in Unicode
      if (msg.charCodeAt(i) > 30000) { 
        return i;
      }
    }
    return -1;
  }
}
