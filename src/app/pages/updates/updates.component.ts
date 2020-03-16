import { Component, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { Listing } from 'src/app/components/listing/listing.component';
import { UpdateService, Filter } from 'src/app/services/update.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  Filter = Filter;

  readonly filter$ = new BehaviorSubject<Filter>(Filter.ALL);
  readonly quote$ = this.quotes.unique$('updates');
  readonly history$ = this.updates.results$;
  readonly latest$: Observable<Listing> = this.filter$.pipe(
    switchMap(res => this.updates.filtered$(res, 6)),
    switchMap(res => from(res)),
    map(res => ({ 
      ...res, 
      description: this.buildHyperlinks(res.description), 
      image$: res.thumbnail && of(res.thumbnail) 
    })),
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

  toggleFilter(type: Filter) {
    this.filter$.next(type);
  }

  buildHyperlinks(content: string) {
    if(!content)
      return null;
    const occurrence = content.match(/(http)\S+/g);
    if(occurrence) {
      occurrence.forEach(el => 
        content = content.replace(el, `<a href="${el}" target="_blank">${el}</a>`)
      );
    }
    return content;
  }
  
  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}