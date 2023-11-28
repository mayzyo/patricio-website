import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FeedType } from '../../../shared/enums/feed-type';

@Component({
    selector: 'app-feed-filter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './feed-filter.component.html',
    styleUrl: './feed-filter.component.scss',
    host: { class: 'd-flex justify-content-end' }
})
export class FeedFilterComponent {
    protected readonly FeedType = FeedType;
    
    protected readonly _selected = signal(FeedType.ALL);
    @Input() set selected(value: FeedType) {
        this._selected.set(value);
    }
    
    @Output() filterChange = new EventEmitter<FeedType>();
}
