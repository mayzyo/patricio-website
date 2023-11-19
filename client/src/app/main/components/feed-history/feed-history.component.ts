import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Feed } from '../../../models/feed';

@Component({
    selector: 'app-feed-history',
    templateUrl: './feed-history.component.html',
    styleUrl: './feed-history.component.scss'
})
export class FeedHistoryComponent {
    protected readonly _dataSource = signal(new Array<Feed>());
    @Input() set dataSource(value: Feed[] | null) {
        value && this._dataSource.set(value);
    }

    @Output() scrolled = new EventEmitter<void>();
}
