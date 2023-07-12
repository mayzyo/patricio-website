import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable, Subject, iif, merge, of, scan, switchMap, tap, map, shareReplay, combineLatest } from 'rxjs';
import { Update } from 'src/app/models/update';
import { Filter } from '../enums/filter';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public readonly pageSize: number = 10;
  public get EndReached() { return this.endReached; }
  private readonly load$ = new Subject<void>();
  private readonly refresh$ = new Subject<void>();
  private endReached: boolean = false;

  // readonly results$ = merge(of(null), this.refresh$).pipe(
  //   tap(() => this.endReached = false),
  //   switchMap(() => merge(of(null), this.load$).pipe(
  //     scan(acc => acc + 1, 0),
  //     switchMap(res => iif(
  //       () => !this.endReached,
  //       this.http.get<Update[]>(`${this.baseUrl}updates`, { params: { page: res.toString(), size: this.pageSize.toString() } }),
  //       of([])
  //     )),
  //     map<Update[], UpdateAsync[]>(res => res.map(el => new UpdateAsync(el))),
  //     scan<UpdateAsync[], UpdateAsync[]>((acc, cur) => acc.concat(cur), []),
  //     tap(res => this.endReached = res.length % this.pageSize != 0)
  //   )),
  //   shareReplay(1),
  // );

  constructor(private firestore: Firestore) { }

  refresh() {
    this.refresh$.next();
  }

  load() {
    this.load$.next();
  }

  // Apply filter to the total results
  // filteredResults$(filter$: Observable<Filter>) {
  //   return combineLatest(this.results$, filter$).pipe(
  //     map(res => {
  //       switch(res[1]) {
  //         case Filter.ALL:
  //           return res[0];
  //         case Filter.EVENT:
  //           return res[0].filter((el: any) => el.link != null);
  //         case Filter.POST:
  //           return res[0].filter((el: any) => el.link == null);
  //       }
  //     }),
  //   );
  // }

  // If filtered results isn't sufficient, call API with filter.
  // filtered$(filter: Filter, size = 4) {
  //   return this.filteredResults$(of(filter)).pipe(
  //     switchMap(res => iif(() => 
  //       res.length >= size,
  //         of(res as UpdateAsync[]).pipe(
  //           map(x => x.slice(0, size)),
  //         ),
  //         this.http.get<Update[]>(`${this.baseUrl}updates`, { params: { page: '1', size: size.toString(), filter } }).pipe(
  //           map(x => x.map(el => new UpdateAsync(el))),
  //         )
  //       )
  //     ),
  //     share()
  //   );
  // }
}
