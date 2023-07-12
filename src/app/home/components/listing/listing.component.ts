import { Component, OnInit, Input } from '@angular/core';
import { Observable, scan } from 'rxjs';
import { Listing } from '../../types/listing';
import { ContentService } from '../../services/content.service';
import { delayInterval } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @Input() datasource$!: Observable<Listing>;
  @Input() animTrigger$?: Observable<void>;
  @Input() showDate?: boolean;
  
  protected readonly stockImage$ = this.contents.stockGallery$();

  collection$!: Observable<Listing[]>;

  constructor(private contents: ContentService) { }

  ngOnInit() {
    this.collection$ = this.datasource$.pipe(
      delayInterval(300, this.animTrigger$),
      scan<Listing, Listing[]>((acc, cur) => [ ...acc, cur ], []),
    );
  }
}
