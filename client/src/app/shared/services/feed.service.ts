import { Injectable } from '@angular/core';
import { DocumentData, Firestore, Query, and, collection, collectionData, getCountFromServer, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, from, zip } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { FeedItem } from '../../models/feed-item';
import { FeedType } from '../enums/feed-type';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    private readonly refresh$ = new Subject<FeedType>();
    private readonly load$ = new Subject<void>();
    private readonly loadArchived$ = new Subject<void>();
    private readonly pageSize = 10;

    readonly list$ = this.initialiseList();
    readonly recent$ = this.initialiseRecent();
    readonly archived$ = this.initialiseArchived();;
    readonly upcoming$ = this.initialiseUpcoming();
    
    constructor(private firestore: Firestore) {}

    refresh(feedType = FeedType.ALL): void {
        this.refresh$.next(feedType);
    }

    load(): void {
        this.load$.next();
    }

    loadArchived(): void {
        this.loadArchived$.next();
    }

    private initialiseList(): Observable<FeedItem[]> {
        return this.refresh$.pipe(
            switchMap(type => this.initialiseLoad(type)),
            shareReplay(1)
        );
    }

    private initialiseLoad(type: FeedType): Observable<FeedItem[]> {
        return combineLatest({
            page: this.loadArchived$.pipe(
                startWith(null),
                scan(acc => acc + 1, -1)
            ),
            total: this.initialiseTotal(type, false)
        }).pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            map(({ page }) => this.buildFilteredQuery(type, false, page)),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
            scan((acc, curr) => acc.concat(curr), new Array<FeedItem>()),
        );
    }

    private initialiseUpcoming(): Observable<FeedItem[]> {
        return this.refresh$.pipe(
            map(() => this.buildFilteredQuery(FeedType.EVENT, true)),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
        );
    }

    private initialiseRecent(): Observable<FeedItem[]> {
        return this.refresh$.pipe(
            map(type => this.buildFilteredQuery(type, false)),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
        );
    }

    private initialiseArchived(): Observable<FeedItem[]> {
        return zip(
            this.recent$,
            this.refresh$
        ).pipe(
            switchMap(([ recent, type ]) => this.initialiseLoadArchived(recent, type)),
        );
    }

    private initialiseLoadArchived(recent: FeedItem[], type: FeedType): Observable<FeedItem[]> {
        const recentPageCount = this.getRecentPageCount(recent);

        return combineLatest({
            page: this.loadArchived$.pipe(
                startWith(null),
                scan(acc => acc + 1, recentPageCount - 1)
            ),
            total: this.initialiseTotal(type, false)
        }).pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            // Load as many additional pages as recent$ contains items.
            map(({ page }, index) => this.buildFilteredQuery(
                type,
                false,
                index == 0 ? 0 : page,
                index == 0 ? recentPageCount * this.pageSize : this.pageSize
            )),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
            map((feed, index) => index == 0 ? this.removeExistingFeed(feed, recent) : feed),
            scan((acc, curr) => acc.concat(curr), new Array<FeedItem>()),
        );
    }

    private initialiseTotal(type: FeedType, futureOnly: boolean): Observable<number> {
        const filteredQuery = this.buildFilteredQuery(type, futureOnly);
        return from(getCountFromServer(filteredQuery)).pipe(
            map(res => res.data().count)
        );
    }

    private initialiseFiltered(filteredQuery: Query<DocumentData>): Observable<FeedItem[]> {
        const filtered$ = collectionData(filteredQuery, { idField: 'id' }) as Observable<FeedItem[]>;
        return filtered$.pipe(take(1));
    }

    private buildFilteredQuery(type: FeedType, futureOnly: boolean, page?: number, pageSize = this.pageSize): Query<DocumentData> {
        const feed = collection(this.firestore, 'feed');
        const constraints = this.buildConstraints(type, futureOnly);

        return query(feed,
                ...constraints,
                ...(page ? [
                    startAt(page),
                    limit(pageSize)
                ] : [])
            );
    }

    private buildConstraints(type: FeedType, futureOnly: boolean): any[] {
        switch (type) {
            case FeedType.EVENT:
                if(futureOnly) {
                    return [
                        orderBy('date'),
                        and(where('isEvent', '==', true), where('date','>', new Date())),
                        orderBy('isEvent'),
                    ];
                } else {
                    return [
                        orderBy('date'),
                        where('isEvent', '==', true),
                        orderBy('isEvent'),
                    ];
                }
            case FeedType.POST:
                if(futureOnly) {
                    return [
                        orderBy('date'),
                        and(where('isEvent', '==', false), where('date','>', new Date())),
                        orderBy('isEvent'),
                    ];
                } else {
                    return [
                        orderBy('date'),
                        where('isEvent', '==', false),
                        orderBy('isEvent'),
                    ];
                }
            default:
            case FeedType.ALL:
                return [
                    orderBy('date')
                ];
        }
    }

    private removeExistingFeed(feed: FeedItem[], existing: FeedItem[]): FeedItem[] {
        return feed.filter(({ id }) => !existing.find(item => item.id == id));
    }

    private getRecentPageCount(recent: FeedItem[]): number {
        const rawRecentPages = recent.length / this.pageSize;
        let recentPages = Math.floor(rawRecentPages);

        /*
        This is so that history will load an additional page when the
        initial amount of recent feed has no remainders.
        Meaning archived feed will filter out every feed item for it's
        first page.
        */
        if(rawRecentPages == recentPages) {
            recentPages += 1;
        }

        return recentPages;
    }
}
