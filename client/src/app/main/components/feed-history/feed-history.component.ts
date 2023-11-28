import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FeedItem } from '../../../models/feed-item';

@Component({
    selector: 'app-feed-history',
    templateUrl: './feed-history.component.html',
    styleUrl: './feed-history.component.scss'
})
export class FeedHistoryComponent {
    protected readonly _dataSource = signal(new Array<FeedItem>());
    @Input() set dataSource(value: FeedItem[] | null) {
        value && this._dataSource.set(value);
    }

    @Output() scrolled = new EventEmitter<void>();
}
