import { Component, Input, OnInit } from '@angular/core';
import { interval, merge, Observable, of, zip } from 'rxjs';
import { map, pluck, reduce, scan, share, skip, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-highlight-reel',
  templateUrl: './highlight-reel.component.html',
  styleUrls: ['./highlight-reel.component.scss']
})
export class HighlightReelComponent implements OnInit {
  @Input() datasource$?: Observable<Touchable>;
  @Input() animTrigger$?: Observable<void>;

  oversizeItem$?: Observable<Touchable>;
  largeItem$?: Observable<Touchable>;
  wideItems$?: Observable<Touchable[]>;
  items$?: Observable<Touchable[]>;
  hover?: Touchable;

  constructor() { }

  ngOnInit(): void {
    this.animTrigger$ = of()
    if(this.datasource$ && this.animTrigger$) {
      this.initCollection(this.datasource$, this.animTrigger$);
    }
  }

  private initCollection(datasource$: Observable<Touchable>, animTrigger$: Observable<void>) {
    var collection$ = datasource$.pipe(
      share()
    );
    // var collection$ = zip(
    //   datasource$,
    //   animTrigger$.pipe(
    //     take(1),
    //     switchMap(() => merge(of(null), interval(600)))
    //   )
    // ).pipe(
    //   pluck('0'),
    //   // tap(res => this.entryFade(res)),
    //   share()
    // );

    this.oversizeItem$ = collection$.pipe(
      take(1)
    );
    this.largeItem$ = collection$.pipe(
      skip(1),
      take(1),
    );
    this.wideItems$ = collection$.pipe(
      skip(2),
      scan<Touchable, Touchable[]>((acc, cur) => [...acc, cur], []),
      take(3),
    );
    this.items$ = collection$.pipe(
      skip(5),
      scan<Touchable, Touchable[]>((acc, cur) => [...acc, cur], []),
      take(4)
    );
  }
}

interface Touchable {
  title?: string,
  subtitle?: string,
  backgroundUrl?: string
}