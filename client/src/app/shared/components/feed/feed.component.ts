import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { TimeFromNowPipe } from '../../pipes/time-from-now.pipe';
import { Feed } from '../../../models/feed';

@Component({
    selector: 'app-feed',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, TimeFromNowPipe],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss'
})
export class FeedComponent {
    @Input() showDate?: boolean;

    protected readonly _dataSource = signal(new Array<Feed>());
    @Input() set dataSource(value: Feed[] | null) {
        value && this._dataSource.set(value);
    }

    protected readonly faBullhorn = faBullhorn;
}
