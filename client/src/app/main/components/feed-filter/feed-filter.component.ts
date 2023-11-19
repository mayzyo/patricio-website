import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FeedFilter } from '../../enums/feed-filter';

@Component({
    selector: 'app-feed-filter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './feed-filter.component.html',
    styleUrl: './feed-filter.component.scss',
    host: {
        class: 'd-flex justify-content-end'
    }
})
export class FeedFilterComponent {
    protected readonly FeedFilter = FeedFilter;
    
    protected readonly _selected = signal(FeedFilter.ALL);
    @Input() set selected(value: FeedFilter) {
        this._selected.set(value);
    }
    
    @Output() filterChange = new EventEmitter<FeedFilter>();
}
