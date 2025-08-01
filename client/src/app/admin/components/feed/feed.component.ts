import { AfterViewInit, ChangeDetectionStrategy, Component, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { FeedEditorComponent } from '../feed-editor/feed-editor.component';
import { FeedService } from '../../../shared/services/feed.service';
import { FeedFormService } from '../../services/feed-form.service';
import { FeedItem } from '../../../models/feed-item';
import { EditorAction } from '../../interfaces/editor-action';
import { TimeFromNowPipe } from '../../../shared/pipes/time-from-now.pipe';

@Component({
    selector: 'app-feed',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        TimeFromNowPipe,
        EditorModalComponent,
        FeedEditorComponent
    ],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss',
    providers: [FeedFormService]
})
export class FeedComponent implements AfterViewInit {
    protected readonly faBullhorn = faBullhorn;

    protected readonly feed$ = this.feed.list$;

    protected readonly selected = signal<FeedItem | null>(null);

    constructor(private feed: FeedService, private feedForm: FeedFormService) {
        this.RespondToSelection();
    }

    ngAfterViewInit(): void {
        this.feed.refresh();
    }

    selectItem(feedItem: FeedItem): void {
        this.selected.update(prev => prev?.id == feedItem.id ? null : feedItem);
    }

    protected onScroll(): void {
        this.feed.load();
    }

    protected onAction(action: EditorAction): void {
        if(action.clearSelection) {
            this.selected.set(null);
        }

        this.feed.refresh();
    }

    private RespondToSelection(): void {
        effect(() => {
            const selected = this.selected();

            if(selected != null) {
                untracked(() => this.feedForm.assign(selected));
            } else {
                untracked(() => this.feedForm.clear());
            }
        });
    }
}
