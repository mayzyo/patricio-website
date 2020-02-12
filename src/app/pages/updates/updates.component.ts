import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, stagger } from '@angular/animations';
import { fadeIn, landingFadeIn } from 'src/app/animations/fade-in';
import { Subject, merge, of, Observable } from 'rxjs';
import { switchMap, scan, tap, share, map } from 'rxjs/operators';
import { Update } from 'src/app/models/Update';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.media')),
  //   trigger('fadeInOpt', fadeIn('.anim-obj')),
  // ],
  animations: [
    trigger('fadeInOpt', [
      transition(`* => *`, [
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
export class UpdatesComponent implements OnInit {

  readonly quote$ = this.quotes.procedure$('updates');
  readonly updateHistory$ = new Subject<void>();
  readonly history$: Observable<Update[]> = this.setupPagination(this.updateHistory$);
  readonly latest$: Observable<Update[]> = this.history$.pipe(
    map(res => [...res].splice(0, 4))
  );

  animState = false;

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
  ) { }

  ngOnInit() {
    this.animState = true;
  }

  onScroll() {
    this.updateHistory$.next();
  }

  private setupPagination(update$: Subject<void>) {
    return merge(
      of(null), 
      update$
    ).pipe(
      scan(acc => acc + 1, 0), 
      switchMap(res => this.http.get<Update[]>(
        '/api/updates', 
        { params: { page: res.toString(), size: '10', filter: 'latest' } }
      )),
      scan((acc, cur) => acc.concat(cur), new Array<Update>()),
      share()
    );
  }
}
