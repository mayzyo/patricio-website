import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/models/Moment';
import { BehaviorSubject, from, of, merge } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { rapidFire } from 'src/app/utils/custom-operators';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('media');

  readonly updateMoments$ = new BehaviorSubject<number>(1);
  readonly moments$ = this.updateMoments$.pipe(
    map(res => ({ page: res.toString(), size: '6' })),
    switchMap(res => this.http.get<Moment[]>('/api/media/moments', { params: res })),
    switchMap(res => from(res).pipe(
      map(res => ({
        ...res,
        date: new Date(res.date),
        image$: res.thumbnail && merge(
          of(res.thumbnail),
          this.contents.get(`/api/media/images/${res.imageKey}`).pipe(
            tap(x => (this.current as any).image$ = of(x))
            // To retain the file URL replacing the HTTP request.
          )
        )
      })),
      tap(res => res && this.current == null && (this.current = res)),
      rapidFire(300),
    )),
    scan<Moment, Moment[]>((acc, cur) => [ ...acc, cur ], [])
  )

  current: Moment;

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private admin: AdminService,
    private contents: ContentService,
  ) { }

  ngOnInit() {
  }

  onScroll() {
    this.updateMoments$.next(this.updateMoments$.value + 1);
  }

  onSelect(moment: Moment) {
    this.current = moment;
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
