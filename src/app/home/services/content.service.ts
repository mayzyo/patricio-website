import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, fromEvent, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  readonly portrait$ = this.get('api/image/portrait');

  constructor(private sanitizer: DomSanitizer, private firestore: Firestore) { }

  get(url: string): Observable<SafeUrl> {
    return of({});
    // return this.http.get(this.baseUrl.concat(url), { responseType: 'blob' }).pipe(
    //   map(res => window.URL.createObjectURL(res)),
    //   map(res => this.sanitizer.bypassSecurityTrustUrl(res))
    // )
  }

  stockGallery(index?: number) {
    return `./assets/images/stock-${index || Math.round(Math.random() * 4) + 1}.jpg`;
  }

  stockGallery$(index?: number) {
    return of(index).pipe(
      switchMap(res => of(this.stockGallery(res)))
    );
  }

  readAsBase64$(ob$: Observable<Blob>) {
    return ob$.pipe(
      switchMap(res => {
        const reader = new FileReader();
        const event$ = fromEvent(reader, 'load');
        reader.readAsDataURL(res);
        return event$;
      }),
      map((res: any) => res.currentTarget?.result)
    );
  }
}
