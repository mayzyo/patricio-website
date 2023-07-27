import { AfterViewInit, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AdminService } from 'src/app/core/services/admin.service';
import { QuotesService } from 'src/app/shared/services/quotes.service';
import { MomentService } from '../../services/moment.service';
import { MomentAsync } from 'src/app/shared/classes/moment-async';
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements AfterViewInit {
    readonly quote$ = this.quotes.unique$('media');
    readonly moments$ = this.moments.list$.pipe(
        tap(res => this.current == null && (this.current = res[0])),
    );

    current?: MomentAsync | null;

    protected readonly faEdit = faEdit;
    protected readonly faClock = faClock;

    constructor(
        private quotes: QuotesService,
        private admin: AdminService,
        private moments: MomentService,
    ) { }

    ngAfterViewInit(): void {
        this.moments.refresh();
    }

    onScroll() {
        this.moments.load();
    }

    onSelect(moment: MomentAsync) {
        this.current = moment;
    }

    loggedIn = this.admin.loggedIn;
    edit(editorType: string) {
        this.admin.open(editorType);
    }
}
