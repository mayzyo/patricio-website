import { Component, OnInit, Input } from '@angular/core';
import { Observable, zip, interval, of, merge } from 'rxjs';
import { take, skip, scan, pluck, share, switchMap } from 'rxjs/operators';
import { ContentService } from '../../services/image.service';

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

  constructor(
    private contents: ContentService
  ) { }

  ngOnInit() {
    this.collection$ = zip(
      this.datasource$, 
      this.animTrigger$
      ? this.animTrigger$.pipe(
        take(1),
        switchMap(() => merge(of(null), interval(300)))
      )
      : interval(300)
    ).pipe(
      pluck('0'),
      share(),
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
      scan<Highlight, Highlight[]>((acc, cur) => [ ...acc, cur ], []),
      take(3),
    );
    this.items$ = this.collection$.pipe(
      skip(5),
      scan<Highlight, Highlight[]>((acc, cur) => [ ...acc, cur ], []),
      take(4)
    );
  }
}

export interface Highlight {
  title: string;
  url: string;
  description?: string;
  image$?: unknown;
}
