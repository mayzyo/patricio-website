import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { of } from 'rxjs';
import { FeedFilter } from '../../enums/feed-filter';
import { generateFeeds } from '../../../../test/generators/feed';

@Component({
    selector: 'app-updates',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './updates.component.html',
    styleUrl: './updates.component.scss'
})
export class UpdatesComponent {
    protected readonly selectedFilter = signal(FeedFilter.ALL);
    protected readonly feed$ = of(generateFeeds());
    protected readonly history$ = of(generateFeeds());

    onScroll(): void {
        
    }
}
