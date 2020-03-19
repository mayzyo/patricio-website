import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/models/Moment';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { tap } from 'rxjs/operators';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('media');

  readonly moments$ = this.moments.results$.pipe(
    tap(res => this.current == null && (this.current = res[0])),
  );

  current: Moment;

  constructor(
    private quotes: QuotesService,
    private admin: AdminService,
    private moments: MomentService,
  ) { }

  ngOnInit() {
  }

  onScroll() {
    this.moments.load();
  }

  onSelect(moment: Moment) {
    this.current = moment;
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}
