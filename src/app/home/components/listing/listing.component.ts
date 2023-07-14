import { Component, Input, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, filter, scan, map } from 'rxjs/operators';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ContentService } from '../../services/content.service';
import { UpdateService } from '../../services/update.service';
import { delayInterval } from 'src/app/utils/custom-operators';
import { UpdateAsync } from '../../classes/update-async';
import { Filter } from '../../enums/filter';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    @Input() animTrigger$?: Observable<void>;
    @Input() showDate?: boolean;

    private readonly stockImage$ = this.contents.stockGallery$();
    protected readonly upcoming$: Observable<UpdateAsync[]> = this.updates.results$.pipe(
        switchMap(res => from(res)),
        filter(res => res.date > new Date()),
        delayInterval(300, this.animTrigger$),
        map(res => ({ ...res, image$: res.image$ ?? this.stockImage$ })),
        scan((acc, cur) => [...acc, cur], new Array<UpdateAsync>()),
    );

    protected readonly faBullhorn = faBullhorn;

    constructor(private updates: UpdateService, private contents: ContentService) { }

    ngOnInit(): void {
        this.updates.refresh(Filter.EVENT);
    }
}
