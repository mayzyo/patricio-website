import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, switchMap, scan } from 'rxjs/operators';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
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
  readonly latest$ = this.updates.filteredResults$(this.filter$).pipe(
    map(res => res.map(el => ({ ...el, description: this.buildHyperlinks(el.description) }))),
    scan<any[] | null, [unknown[], unknown[]]>((acc, cur) => 
      [acc[1], cur.filter(el => !acc[1].find(x => (x as any).id == el.id))], 
      [[], []]
    ), // Filter out the objects that exists in the previous state and outputing the [previous total, new objects].
    switchMap(res => from(res[1])),
  );
  
  constructor(
    private quotes: QuotesService,
    private updates: UpdateService,
    private admin: AdminService
  ) { }

  ngOnInit() {
  }

  onScroll() {
    this.updates.load();
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