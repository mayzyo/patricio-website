import { Component, Input, AfterViewInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap, filter, scan, map, tap } from 'rxjs/operators';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ContentService } from '../../../home/services/content.service';
import { UpdateService } from '../../../home/services/update.service';
import { UpdateAsync } from '../../../home/classes/update-async';
import { Filter } from '../../../home/enums/filter';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeFromNowPipe } from '../../pipes/time-from-now.pipe';
import { delayInterval } from '../../operators/delay-interval';

@Component({
    standalone: true,
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TimeFromNowPipe
    ]
})
export class ListingComponent implements AfterViewInit {
    @Input() animTrigger$?: Observable<void>;
    @Input() showDate?: boolean;
    @Input() filter: Filter = Filter.EVENT;
    @Input() futureOnly: boolean = false;

    private readonly stockImage$ = this.contents.stockGallery$();
    protected readonly feed$: Observable<UpdateAsync[]> = this.updates.list$.pipe(
        switchMap(res => from(res)),
        filter(res => this.futureOnly ? res.date > new Date() : true),
        delayInterval(300, this.animTrigger$),
        map(res => ({ ...res, image$: res.image$ ?? this.stockImage$ })),
        scan((acc, cur) => [...acc, cur], new Array<UpdateAsync>()),
    );

    protected readonly faBullhorn = faBullhorn;

    constructor(private updates: UpdateService, private contents: ContentService) { }

    ngAfterViewInit(): void {
        this.updates.refresh(this.filter);
    }
}
