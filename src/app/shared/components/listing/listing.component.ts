import { Component, Input, AfterViewInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap, filter, scan, map, tap } from 'rxjs/operators';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ContentService } from '../../../home/services/content.service';
import { UpdateService } from '../../../home/services/update.service';
import { delayInterval } from 'src/app/utils/custom-operators';
import { UpdateAsync } from '../../../home/classes/update-async';
import { Filter } from '../../../home/enums/filter';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
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
    tester$ = of(null).pipe(tap(() => console.log('hey')))

    constructor(private updates: UpdateService, private contents: ContentService) { }

    ngAfterViewInit(): void {
        this.updates.refresh(this.filter);
    }
}
