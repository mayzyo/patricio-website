import { Component, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { TimeFromNowPipe } from '../../pipes/time-from-now.pipe';
import { FeedItem } from '../../../models/feed-item';

@Component({
    selector: 'app-feed',
    imports: [CommonModule, FontAwesomeModule, TimeFromNowPipe],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss'
})
export class FeedComponent {
    protected readonly faBullhorn = faBullhorn;

    showDate = input<boolean>(false);
    dataSource = input<FeedItem[] | null>(new Array<FeedItem>());
}
