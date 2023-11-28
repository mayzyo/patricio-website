import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { EditorService } from '../../../admin/services/editor.service';
import { FeedService } from '../../../shared/services/feed.service';
import { FeedType } from '../../../shared/enums/feed-type';

@Component({
    selector: 'app-updates',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './updates.component.html',
    styleUrl: './updates.component.scss'
})
export class UpdatesComponent {
    protected readonly selectedFilter = signal(FeedType.ALL);
    protected readonly recent$ = this.feed.recent$;
    protected readonly archived$ = this.feed.archived$;

    constructor(private feed: FeedService, private editor: EditorService) {
        this.respondToFilterChange();
    }

    onScroll(): void {
        this.feed.loadArchived();
    }
    
    async openFeedEditor() {
        const { FeedComponent } = await import("../../../admin/components/feed/feed.component");
        this.editor.open(FeedComponent);
    }

    private respondToFilterChange(): void {
        effect(() => {
            this.feed.refresh(this.selectedFilter());
        });
    }
}
