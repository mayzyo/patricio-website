import { Injectable } from '@angular/core';
import { DocumentData, Firestore, Query, QueryConstraint, collection, collectionData, getCountFromServer, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest, from } from 'rxjs';
import { map, scan, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { FeedItem } from '../../models/feed-item';
import { FeedType } from '../enums/feed-type';
import { FeedPeriod } from '../enums/feed-period';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    private readonly loadArchived$ = new Subject<void>();
    private readonly load$ = new Subject<void>();
    private readonly refresh$ = new Subject<FeedType>();
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
        );
    }

    private initialiseLoad(type: FeedType): Observable<FeedItem[]> {
        return combineLatest({
            page: this.loadArchived$.pipe(
                startWith(null),
                scan(acc => acc + 1, -1)
            ),
            total: this.initialiseTotal(type, FeedPeriod.ALL)
        }).pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            map(({ page }) => this.buildFilteredQuery(
                type,
                FeedPeriod.ALL,
                page
            )),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
            scan((acc, curr) => acc.concat(curr), new Array<FeedItem>()),
        );
    }

    private initialiseUpcoming(): Observable<FeedItem[]> {
        return this.refresh$.pipe(
            map(() => this.buildFilteredQuery(FeedType.EVENT, FeedPeriod.FUTURE)),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
        );
    }

    private initialiseRecent(): Observable<FeedItem[]> {
        return this.refresh$.pipe(
            map(type => this.buildFilteredQuery(type, FeedPeriod.ALL)),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
        );
    }

    private initialiseArchived(): Observable<FeedItem[]> {
        return this.recent$.pipe(
            switchMap(recent => this.initialiseLoadArchived(recent)),
        );
    }

    private initialiseLoadArchived(recent: FeedItem[]): Observable<FeedItem[]> {
        const recentPageCount = this.getRecentPageCount(recent);

        return combineLatest({
            page: this.loadArchived$.pipe(
                startWith(null),
                scan(acc => acc + 1, recentPageCount - 1)
            ),
            total: this.initialiseTotal(FeedType.ALL, FeedPeriod.ALL)
        }).pipe(
            takeWhile(({ page, total }) => page * this.pageSize < total),
            // Load as many additional pages as recent$ contains items.
            map(({ page }, index) => this.buildFilteredQuery(
                FeedType.ALL,
                FeedPeriod.ALL,
                index == 0 ? 0 : page,
                index == 0 ? recentPageCount * this.pageSize : this.pageSize
            )),
            switchMap(filteredQuery => this.initialiseFiltered(filteredQuery)),
            map((feed, index) => index == 0 ? this.removeExistingFeed(feed, recent) : feed),
            scan((acc, curr) => acc.concat(curr), new Array<FeedItem>()),
        );
    }

    private initialiseTotal(type: FeedType, period: FeedPeriod): Observable<number> {
        const filteredQuery = this.buildFilteredQuery(type, period);
        return from(getCountFromServer(filteredQuery)).pipe(
            map(res => res.data().count)
        );
    }

    private initialiseFiltered(filteredQuery: Query<DocumentData>): Observable<FeedItem[]> {
        const filtered$ = collectionData(filteredQuery, { idField: 'id' }) as Observable<FeedItem[]>;
        return filtered$.pipe(take(1));
    }

    private buildFilteredQuery(type: FeedType, period: FeedPeriod, page?: number, pageSize = this.pageSize): Query<DocumentData> {
        const feed = collection(this.firestore, 'feed');
        const typeConstraint = this.buildTypeConstraint(type);
        const periodConstraint = this.buildPeriodConstraint(period);

        return query(feed,
                ...typeConstraint,
                ...periodConstraint,
                ...(page ? [
                    orderBy('date'),
                    startAt(page),
                    limit(pageSize)
                ] : [])
            );
    }

    private buildTypeConstraint(type: FeedType): QueryConstraint[] {
        switch (type) {
            case FeedType.EVENT:
                return [
                    where('link', '!=', ''),
                    orderBy('link')
                ];
            case FeedType.POST:
                return [
                    where('link', '==', ''),
                    orderBy('link')
                ];
            default:
            case FeedType.ALL:
                return [];
        }
    }

    private buildPeriodConstraint(period: FeedPeriod): QueryConstraint[] {
        switch (period) {
            case FeedPeriod.FUTURE:
                return [
                    where('date','>=', new Date())
                ];
            case FeedPeriod.PAST:
                return [
                    where('date','<', new Date())
                ];
            default:
            case FeedPeriod.ALL:
                return [];
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
