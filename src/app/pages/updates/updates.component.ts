import { Component, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject, from } from 'rxjs';
import { switchMap, scan, map, share, take } from 'rxjs/operators';
import { Update } from 'src/app/models/Update';
import { QuotesService } from 'src/app/services/quotes.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { Listing } from 'src/app/components/listing/listing.component';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('updates');

  readonly updateUpdates$ = new BehaviorSubject<number>(1);
  readonly updates$ = this.updateUpdates$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Update[]>('/api/updates', { params: res })),
    share()
  );

  readonly history$ = this.updates$.pipe(
    scan<Update[], Update[]>((acc, cur) => acc.concat(cur), []),
  );

  readonly latest$: Observable<Listing> = this.updates$.pipe(
    switchMap(res => from(res)),
    take(6),
    map(res => ({ ...res, image$: res.thumbnail && of(res.thumbnail) })),
  );

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  onScroll() {
    this.updateUpdates$.next(this.updateUpdates$.value + 1);
  }
  
  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
