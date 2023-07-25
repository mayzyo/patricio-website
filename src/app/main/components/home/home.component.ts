import { Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, from, switchMap, filter, share, delayWhen, Subject, BehaviorSubject, tap, of } from 'rxjs';
import { QuotesService } from '../../../shared/services/quotes.service';
import { faRecordVinyl, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { UpdateAsync } from '../../../shared/classes/update-async';
import { UpdateService } from 'src/app/shared/services/update.service';
import { BiographyService } from 'src/app/shared/services/biography.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    @ViewChild('HighlightRef', { static: true }) highlightRef!: ElementRef;
    @ViewChild('UpcomingRef', { static: true }) upcomingRef!: ElementRef;
    @ViewChild('BiographyRef', { static: true }) biographyRef!: ElementRef;
    @ViewChild("BiographyEditor", { read: ViewContainerRef }) biographyEditor!: ViewContainerRef;

    protected readonly faRecordVinyl = faRecordVinyl;
    protected readonly faPortrait = faPortrait;
    protected readonly faEdit = faEdit;

    // Boolean because it is used to trigger the disabling of arrow down in banner-landing component
    highlightTrigger$ = new BehaviorSubject<boolean>(false);
    listingTrigger$ = new Subject<void>();
    biographyTrigger$ = new Subject<void>();

    readonly quote$ = this.quotes.unique$('home');
    readonly upcoming$: Observable<UpdateAsync> = this.updates.list$.pipe(
      switchMap(res => from(res)),
      filter(res => res.date > new Date()),
      share()
    );

    readonly biography$: Observable<string[]> = of(null).pipe(
        delayWhen(() => this.biographyTrigger$),
        switchMap(() => this.biography.paragraphs$)
    );

    protected isArrowDisabled: boolean = false;

    constructor(
        private quotes: QuotesService,
        private updates: UpdateService,
        private biography: BiographyService
    ) { }

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

    // loggedIn = this.admin.loggedIn;
    loggedIn = true;
    async edit(editorType: string) {
        const { BiographyComponent } = await import("../../../admin/components/biography/biography.component");
        this.biographyEditor.clear();
        this.biographyEditor.createComponent(BiographyComponent);
        // this.admin.open(editorType);
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
