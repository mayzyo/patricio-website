import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { fadeIn, landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { Subject, merge, of, Observable } from 'rxjs';
import { switchMap, scan, tap, share, map } from 'rxjs/operators';
import { Announcement } from 'src/app/models/Announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.media')),
  //   trigger('fadeInOpt', fadeIn('.anim-obj')),
  // ],
  animations: [
    trigger('fadeIn', [
      transition(`* => true`, [
        query('.media', [
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
    trigger('fadeInOpt', [
      transition(`* => true`, [
        query('.anim-obj', [
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
  ],
})
export class AnnouncementsComponent implements OnInit {

  readonly quote$ = this.contents.randomQuote$;

  readonly updateHistory$: Subject<void>;
  readonly history$: Observable<Announcement[]>;
  readonly latest$: Observable<Announcement[]>;

  constructor(private contents: ContentService) {
    
    this.updateHistory$ = new Subject();
    this.history$ = this.setupPagination(this.updateHistory$);
    this.latest$ = this.history$.pipe(
      map(res => [...res].splice(0, 4))
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onScroll() {
    this.updateHistory$.next();
  }

  private setupPagination(update$: Subject<void>) {
    return merge(of(null), update$).pipe(
      scan(acc => acc + 1, 0), 
      switchMap(res => this.contents.announcement(res.toString(), '10')),
      scan((acc, cur) => acc.concat(cur), new Array<Announcement>()),
      share()
    );
  }
}