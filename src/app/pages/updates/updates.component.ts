import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { scan, map, take } from 'rxjs/operators';
import { Update } from 'src/app/models/Update';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { Listing } from 'src/app/components/listing/listing.component';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('updates');
  readonly history$ = this.updates.result$.pipe(
    scan<Update, Update[]>((acc, cur) => acc.concat(cur), []),
  );
  readonly latest$: Observable<Listing> = this.updates.result$.pipe(
    take(6),
    map(res => ({ ...res, image$: res.thumbnail && of(res.thumbnail) })),
  );

  constructor(
    private quotes: QuotesService,
    private updates: UpdateService,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  onScroll() {
    this.updates.next();
  }
  
  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
