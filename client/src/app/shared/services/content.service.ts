import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, iif, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { STORAGE_URL } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private readonly storageUrl = inject(STORAGE_URL);
    private readonly http = inject(HttpClient);
    private readonly sanitizer = inject(DomSanitizer);

    getImage(thumbnail?: string, id?: string): Observable<any> {
        return iif(
            () => id != '',
            concat(
                of(thumbnail),
                // This is preferred to just sending the url because the thumbnail will be displayed while the highres image is still loading.
                this.http.get(this.storageUrl.concat(id as string), { responseType: 'blob' }).pipe(
                    map(res => window.URL.createObjectURL(res)),
                    map(res => this.sanitizer.bypassSecurityTrustUrl(res))
                )
            ),
            this.stockGallery()
        );
    }

    getImageUrl(id: string): string {
        return this.storageUrl.concat(id as string);
    }

    stockGallery(index?: number) {
        return `./assets/images/stock-${index || Math.round(Math.random() * 4) + 1}.jpg`;
    }
}
