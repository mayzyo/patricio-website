import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ContentService } from 'src/app/services/content.service';
import { delayInterval } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {

  @Input() datasource$: Observable<Listing>;
  @Input() animTrigger$?: Observable<void>;
  @Input() showDate?: boolean;
  readonly stockImage$ = this.contents.stockGallery$();

  collection$: Observable<Listing[]>;

  constructor(
    private contents: ContentService,
  ) { }

  ngOnInit() {
    this.collection$ = this.datasource$.pipe(
      delayInterval(300, this.animTrigger$),
      scan<Listing, Listing[]>((acc, cur) => [ ...acc, cur ], []),
    );
  }
}

export interface Listing {
  title: string;
  description: string;
  link?: string;
  image$?: unknown;
  date: Date;
}
