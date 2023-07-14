import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, from, map, switchMap, filter, share, delayWhen, Subject, BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { QuotesService } from '../../services/quotes.service';
import { AdminService } from 'src/app/core/services/admin.service';
import { UpdateService } from '../../services/update.service';
import { faRecordVinyl, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { UpdateAsync } from '../../classes/update-async';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    @ViewChild('HighlightRef', { static: true }) highlightRef!: ElementRef;
    @ViewChild('UpcomingRef', { static: true }) upcomingRef!: ElementRef;
    @ViewChild('BiographyRef', { static: true }) biographyRef!: ElementRef;

    readonly quote$ = this.quotes.unique$('home');
    readonly upcoming$: Observable<UpdateAsync> = this.updates.results$.pipe(
      switchMap(res => from(res)),
      filter(res => res.date > new Date()),
      share()
    );

    readonly biography$: Observable<string[]>;

    // Boolean because it is used to trigger the disabling of arrow down in banner-landing component
    highlightTrigger$ = new BehaviorSubject<boolean>(false);
    listingTrigger$ = new Subject<void>();
    biographyTrigger$ = new Subject<void>();
    protected isArrowDisabled: boolean = false;
    protected readonly faRecordVinyl = faRecordVinyl;
    protected readonly faPortrait = faPortrait;
    protected readonly faEdit = faEdit;

    constructor(
        private quotes: QuotesService,
        private updates: UpdateService,
        private admin: AdminService,
        private firestore: Firestore
    ) {
        const readCollection = collection(this.firestore, 'profile');
        const fetchedProfile$ = collectionData(readCollection) as Observable<Profile[]>;

        this.biography$ = fetchedProfile$.pipe(
            map(res => res[0].socialMedia.biography),
            map(res => {
                const cutoff = this.languageCut(res)
                return cutoff != -1
                    ? [res.slice(0, cutoff), res.slice(cutoff, res.length)]
                    : [res]
            }),
            delayWhen(() => this.biographyTrigger$),
        );
    }

    @HostListener('window:scroll')
    onScrollEvent() {
        if (this.scrollOffset(this.highlightRef)) {
            this.highlightTrigger$.next(true);
            this.isArrowDisabled = true;
        }

        if (this.scrollOffset(this.upcomingRef)) {
            this.listingTrigger$.next();
        }

        if (this.scrollOffset(this.biographyRef)) {
            this.biographyTrigger$.next();
        }
    }

    scrolldown() {
        this.highlightRef.nativeElement.scrollIntoView({ behavior: "smooth" });
    }

    loggedIn = this.admin.loggedIn;
    edit(editorType: string) {
        this.admin.open(editorType);
    }

    private scrollOffset(elRef: ElementRef) {
        return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
    }

    private languageCut(msg: string) {
        for (var i = 0, n = msg.length; i < n; i++) {
            // Chinese characters are above the 30,000 range in Unicode
            if (msg.charCodeAt(i) > 30000) {
                return i;
            }
        }
        return -1;
    }
}
