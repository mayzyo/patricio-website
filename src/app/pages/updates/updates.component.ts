import { Component, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject, from, Subject } from 'rxjs';
import { switchMap, scan, map, withLatestFrom } from 'rxjs/operators';
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

  readonly quote$ = this.quotes.procedure$('updates');
  readonly updateHistory$ = new BehaviorSubject<number>(1);
  readonly history$ = this.updateHistory$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Update[]>('/api/updates', { params: res })),
    withLatestFrom(this.updateHistory$),
    scan<[Update[], number], Update[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), []),
  );
  readonly latest$: Observable<Listing> = this.history$.pipe(
    map(res => [...res].splice(0, 10)),
    switchMap(res => from(res)),
    map(res => ({ ...res, image$: res.thumbnail && of(res.thumbnail) })),
  );

  readonly animTrigger$ = new Subject();

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private admin: AdminService
  ) { }

  ngOnInit() {
    this.animTrigger$.next();
  }

  onScroll() {
    this.updateHistory$.next(this.updateHistory$.value + 1);
  }
  
  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
