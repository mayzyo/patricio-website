import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { AdminService } from 'src/app/core/services/admin.service';
import { Filter } from 'src/app/home/enums/filter';
import { QuotesService } from 'src/app/home/services/quotes.service';
import { UpdateService } from 'src/app/home/services/update.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
    protected readonly Filter = Filter;
    protected readonly faEdit = faEdit;

    protected readonly quote$ = this.quotes.unique$('updates');
    protected readonly history$ = this.updates.list$;

    protected selectedFilter = Filter.ALL;

    constructor(
        private quotes: QuotesService,
        private updates: UpdateService,
        private admin: AdminService
    ) { }

    loggedIn = this.admin.loggedIn;
    edit(editorType: string) {
        this.admin.open(editorType);
    }

    onScroll() {
        this.updates.load();
    }

    toggleFilter(filter: Filter) {
        this.updates.refresh(filter);
    }
}
