import { Component, OnInit, Input } from '@angular/core';
import { Observable, zip, merge, of, interval } from 'rxjs';
import { take, skip, scan, share, switchMap, pluck, tap } from 'rxjs/operators';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
})
export class HighlightComponent implements OnInit {

  @Input() datasource$: Observable<Highlight>;
  @Input() animTrigger$?: Observable<void>;
  readonly stockImage$ = this.contents.stockGallery$();

  oversizeItem$: Observable<Highlight>;
  largeItem$: Observable<Highlight>;
  wideItems$: Observable<Highlight[]>;
  items$: Observable<Highlight[]>;

  private collection$: Observable<Highlight>;
  hover: Highlight;

  constructor(
    private contents: ContentService
  ) { }

  ngOnInit() {
    this.collection$ = zip(
      this.datasource$,
      this.animTrigger$.pipe(
        take(1),
        switchMap(() => merge(of(null), interval(600)))
      )
    ).pipe(
      pluck('0'),
      tap(res => this.entryFade(res)),
      share()
    );

    this.oversizeItem$ = this.collection$.pipe(
      take(1)
    );
    this.largeItem$ = this.collection$.pipe(
      skip(1),
      take(1),
    );
    this.wideItems$ = this.collection$.pipe(
      skip(2),
      scan<Highlight, Highlight[]>((acc, cur) => [...acc, cur], []),
      take(3),
    );
    this.items$ = this.collection$.pipe(
      skip(5),
      scan<Highlight, Highlight[]>((acc, cur) => [...acc, cur], []),
      take(4)
    );
  }

  private entryFade(item: Highlight) {
    this.hover = item;
    setTimeout(() => {
      if(this.hover == item)
        this.hover = null;
    }, 600);
  }
}

export interface Highlight {
  title: string;
  url: string;
  subtitle?: string;
  image$?: unknown;
}
