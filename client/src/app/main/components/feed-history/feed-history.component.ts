import { Component, input, output } from '@angular/core';
import { FeedItem } from '../../../models/feed-item';

@Component({
    selector: 'app-feed-history',
    templateUrl: './feed-history.component.html',
    styleUrl: './feed-history.component.scss',
    standalone: false
})
export class FeedHistoryComponent {
    dataSource = input<FeedItem[] | null>(null);
    scrolled = output<void>();
}
