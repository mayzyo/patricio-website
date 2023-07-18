import { SafeUrl } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { Update } from "src/app/models/update";

export class UpdateAsync {
    id: string;
    title: string;
    description: string;
    link: string;
    thumbnail: string;
    date: Date;
    image$: Observable<string | SafeUrl>;

    constructor(ob: Update) {
        this.id = ob.id;
        this.title = ob.title;
        this.description = ob.description;
        this.link = ob.link;
        this.thumbnail = ob.thumbnail;
        this.date = ob.date.toDate();

        this.image$ = of(ob.thumbnail);
    }
}