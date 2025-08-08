import { Component, input, output } from '@angular/core';
import { FeedType } from '../../../shared/enums/feed-type';

@Component({
    selector: 'app-feed-filter',
    templateUrl: './feed-filter.component.html',
    styleUrl: './feed-filter.component.scss',
    host: { class: 'd-flex justify-content-end' },
    standalone: false
})
export class FeedFilterComponent {
    protected readonly FeedType = FeedType;
    
    selected = input<FeedType>(FeedType.ALL);
    filterChange = output<FeedType>();
}
