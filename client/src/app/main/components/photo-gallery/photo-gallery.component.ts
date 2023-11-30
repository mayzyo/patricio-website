import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { GalleryState, ImageItem } from 'ng-gallery';
import { Photo } from '../../../models/photo';
import { PhotoService } from '../../../shared/services/photo.service';
import { ContentService } from '../../../shared/services/content.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-photo-gallery',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './photo-gallery.component.html',
    styleUrl: './photo-gallery.component.scss',
    host: { class: 'container' }
})
export class PhotoGalleryComponent {
    protected readonly faClock = faClock;

    protected readonly galleryImages$ = this.initialiseGalleryImages();
    private readonly updateSelectedPhoto$ = new Subject<number>();
    protected readonly selectedPhoto$ = this.initialiseSelectedPhoto();
    private readonly loadMore$ = new Subject<void>();
    
    private total = 0;

    constructor(private photo: PhotoService, private content: ContentService) {
        this.respondToLoadMore();
    }

    onIndexChange(e: GalleryState): void {
        if (e.currIndex !== undefined) {
            this.updateSelectedPhoto$.next(e.currIndex);

            if(e.currIndex == this.total - 1) {
                this.loadMore$.next();
            }
        }
    }

    private respondToLoadMore(): void {
        this.loadMore$.pipe(
            switchMap(() => this.photo.endReached$),
            takeWhile(endReached => endReached == false),
            takeUntilDestroyed()
        ).subscribe(() => this.photo.load());
    }

    private initialiseGalleryImages(): Observable<ImageItem[]> {
        return this.photo.list$.pipe(
            map(photos =>
                photos.map(photo => new ImageItem({
                    src: this.content.getImageUrl(photo.imageId),
                    thumb: photo.thumbnail
                }))
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
}
