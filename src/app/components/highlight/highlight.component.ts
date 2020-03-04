import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { take, skip, scan, share } from 'rxjs/operators';
import { ContentService } from '../../services/content.service';
import { rapidFire } from '../../utils/custom-operators';

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
    this.collection$ = this.datasource$.pipe(
      rapidFire(300, this.animTrigger$),
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
  subtitle?: string;
  image$?: unknown;
}
