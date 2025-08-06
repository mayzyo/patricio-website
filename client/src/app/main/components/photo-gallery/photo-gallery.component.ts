import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Gallery, GalleryItem, GalleryState } from 'ng-gallery';
import { Photo } from '../../../models/photo';
import { PhotoService } from '../../../shared/services/photo.service';
import { ContentService } from '../../../shared/services/content.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-photo-gallery',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './photo-gallery.component.html',
    styleUrl: './photo-gallery.component.scss',
    host: { class: 'container' },
    standalone: false
})
export class PhotoGalleryComponent implements OnInit {
    protected readonly faClock = faClock;

    protected readonly galleryItems$ = this.initialiseGalleryItems();
    private readonly updateSelectedPhoto$ = new Subject<number>();
    protected readonly selectedPhoto$ = this.initialiseSelectedPhoto();
    private readonly loadMore$ = new Subject<void>();
    
    protected readonly mdScreen = signal<boolean | null>(null);
    private total = 0;

    constructor(private gallery: Gallery, private photo: PhotoService, private content: ContentService) {
        this.respondToLoadMore();
    }

    ngOnInit() {
        this.mdScreen.set(this.isTabletScreen(window.innerWidth));
    }
    
    @HostListener('window:resize')
    onResize() {
        this.mdScreen.set(this.isTabletScreen(window.innerWidth));
    }

    onIndexChange(e: GalleryState): void {
        if (e.currIndex !== undefined) {
            this.updateSelectedPhoto$.next(e.currIndex);

            if(e.currIndex == this.total - 1) {
                this.loadMore$.next();
            }
        }
    }

    onMouseEnter(): void {
        const galleryRef = this.gallery.ref('galleryRef');
        galleryRef.stop();
    }

    private respondToLoadMore(): void {
        this.loadMore$.pipe(
            switchMap(() => this.photo.endReached$),
            takeWhile(endReached => endReached == false),
            takeUntilDestroyed()
        ).subscribe(() => this.photo.load());
    }

    private initialiseGalleryItems(): Observable<GalleryItem[]> {
        return this.photo.list$.pipe(
            map(photos =>
                photos.map(photo => ({
                    type: photo.imageId ? 'image' : 'iframe',
                    data: {
                      src: photo.imageId ? this.content.getImageUrl(photo.imageId) : photo.youtube ?? photo.bilibili,
                      thumb: photo.thumbnail ? photo.thumbnail : 'assets/images/video-thumb.png'
                    }
                }) satisfies GalleryItem)
            )
        );
    }

    private initialiseSelectedPhoto(): Observable<Photo> {
        return combineLatest({
            photos: this.photo.list$.pipe(tap(photos => this.total = photos.length)),
            selected: this.updateSelectedPhoto$.pipe(startWith(0))
        }).pipe(
            map(({ photos, selected }) => photos[selected])
        );
    }

    private isTabletScreen(width: number): boolean {
        return width < 768;
    }
}
