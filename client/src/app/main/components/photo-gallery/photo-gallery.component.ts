import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { generatePhotos } from '../../../../test/generators/photo';
import { GalleryState, ImageItem } from 'ng-gallery';
import { Photo } from '../../../models/photo';

@Component({
    selector: 'app-photo-gallery',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './photo-gallery.component.html',
    styleUrl: './photo-gallery.component.scss',
    host: {
        'class': 'container'
    }
})
export class PhotoGalleryComponent {
    protected readonly faClock = faClock;

    private readonly photosRaw$ = of(generatePhotos());
    protected readonly photos$ = this.photosRaw$.pipe(
        map(photos => photos.map(photo => new ImageItem({ src: photo.thumbnail, thumb: photo.thumbnail })))
    );
    private readonly updateSelectedPhoto$ = new Subject<number>();
    protected readonly selectedPhoto$: Observable<Photo> = combineLatest({ photos: this.photosRaw$, selected: this.updateSelectedPhoto$ }).pipe(
        map(({ photos, selected }) => photos[selected])
    );

    protected buildImage(thumbnail?: string, imageId?: string): Observable<any> {
        return of(thumbnail);
    }

    onIndexChange(e: GalleryState): void {
        if (e.currIndex) {
            this.updateSelectedPhoto$.next(e.currIndex);
        }
    }
}
