import { Component, OnInit, Input } from '@angular/core';
import { Observable, zip, interval, merge, of } from 'rxjs';
import { scan, pluck, switchMap, take } from 'rxjs/operators';
import { ContentService } from 'src/app/services/image.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {

  @Input() datasource$: Observable<Listing>;
  @Input() animTrigger$?: Observable<void>;
  readonly stockImage$ = this.contents.stockGallery$();

  collection$: Observable<Listing[]>;

  constructor(
    private contents: ContentService,
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
      scan<Listing, Listing[]>((acc, cur) => [ ...acc, cur ], []),
    );
  }
}

export interface Listing {
  title: string;
  description: string;
  link?: string;
  image$?: unknown;
}
