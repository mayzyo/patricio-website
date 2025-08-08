import { AfterViewInit, Component, effect, inject, Injector, signal } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';
import { FeedService } from '../../../shared/services/feed.service';
import { FeedType } from '../../../shared/enums/feed-type';
import { Observable, from } from 'rxjs';
import { scan, switchMap } from 'rxjs/operators';
import { FeedItem } from '../../../models/feed-item';
import { delayInterval } from '../../../shared/operators/delay-interval';

@Component({
    selector: 'app-updates',
    templateUrl: './updates.component.html',
    styleUrl: './updates.component.scss',
    standalone: false
})
export class UpdatesComponent implements AfterViewInit {
    private feed = inject(FeedService);
    private editor = inject(EditorService);
    private injector = inject(Injector);

    protected readonly selectedFilter = signal(FeedType.ALL);
    protected readonly recent$ = this.initialiseRecentAnimated();
    protected readonly archived$ = this.feed.archived$;

    ngAfterViewInit(): void {
        this.respondToFilterChange();
    }

    onScroll(): void {
        this.feed.loadArchived();
    }

    private respondToFilterChange(): void {
        effect(() => {
            this.feed.refresh(this.selectedFilter());
        }, { injector: this.injector });
    }
    
    async openFeedEditor() {
        const { FeedComponent } = await import("../../../admin/components/feed/feed.component");
        this.editor.open(FeedComponent);
    }

    private initialiseRecentAnimated(): Observable<FeedItem[]> {
        return this.feed.recent$.pipe(
            switchMap(feed => feed.length != 0 ? from(feed).pipe(
                delayInterval(),
                scan((acc, curr) => acc.concat(curr), new Array<FeedItem>())
            ) : [[]]),
        );
    }
}
