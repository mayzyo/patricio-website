import { Component, Input } from '@angular/core';
import { Observable, BehaviorSubject, from, interval, map, merge, of, scan, share, skip, switchMap, take, tap, zip } from 'rxjs';
import { Highlight } from '../../types/highlight';
import { ContentService } from '../../services/content.service';
import { MusicService } from '../../services/music.service';

@Component({
    selector: 'app-highlight',
    templateUrl: './highlight.component.html',
    styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent {
    @Input()
    get isTriggered(): boolean {
        return this.isTriggered$.value;
    }
    set isTriggered(value: boolean) {
        if(value == true) {
            this.isTriggered$.next(value);
        }
    }

    readonly stockImage$ = this.contents.stockGallery$();

    readonly datasource$: Observable<Highlight> = this.musics.favourite$.pipe(
        switchMap(res => from(res)),
        map(res => ({ ...res, image$: res.cover$, subtitle: res.genre, url: `/discography/${res.id}` }) as Highlight)
    );
    private isTriggered$ = new BehaviorSubject<boolean>(false);
    private collection$: Observable<Highlight> = zip(
        this.datasource$.pipe(
            map(res => ({ ...res, image$: res.image$ ?? this.stockImage$ }))
        ),
        this.isTriggered$.pipe(
            take(1),
            switchMap(() => merge(of(null), interval(600)))
        )
    ).pipe(
        map(res => res[0]),
        tap(res => this.entryFade(res)),
        share()
    );

    xlBlock$: Observable<Highlight> = this.collection$.pipe(
        take(1)
    );

    lgBlock$: Observable<Highlight> = this.collection$.pipe(
        skip(1),
        take(1),
    );

    wideBlocks$: Observable<Highlight[]> = this.collection$.pipe(
        skip(2),
        scan<Highlight, Highlight[]>((acc, cur) => [...acc, cur], []),
        take(3),
    )

    smBlocks$: Observable<Highlight[]> = this.collection$.pipe(
        skip(5),
        scan<Highlight, Highlight[]>((acc, cur) => [...acc, cur], []),
        take(4)
    );
    
    hover!: Highlight | null;

    constructor(private contents: ContentService, private musics: MusicService) { }

    private entryFade(item: Highlight) {
        this.hover = item;
        setTimeout(() => {
            if (this.hover == item)
                this.hover = null;
        }, 600);
    }
}
