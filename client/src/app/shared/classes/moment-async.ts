import { SafeUrl } from "@angular/platform-browser";
import { Observable, merge, of, shareReplay } from "rxjs";
import { Moment } from "src/app/models/moment";
import { ContentService } from "../services/content.service";

export class MomentAsync {
    id: string;
    thumbnail: string;
    description: string;
    date: Date;
    imageKey: string;
    image$: Observable<string | SafeUrl>;

    constructor(ob: Moment, contents: ContentService) {
        this.id = ob.id;
        this.thumbnail = ob.thumbnail;
        this.description = ob.description;
        this.imageKey = ob.imageKey;
        this.date = ob.date.toDate();

        this.image$ = merge(
            of(ob.thumbnail),
            contents.get(ob.imageKey).pipe(
                shareReplay(1)
            )
        );
    }
}