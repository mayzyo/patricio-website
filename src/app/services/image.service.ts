import { Injectable } from '@angular/core';
import { of, fromEvent, merge, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, pluck, map, scan, shareReplay, take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  readonly portrait$ = this.get('api/image/portrait');

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  get(url: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(res => window.URL.createObjectURL(res)),
      map(res => this.sanitizer.bypassSecurityTrustUrl(res))
    )
  }

  stockGallery(index?: number) {
    return `./assets/images/stock-${index || Math.floor(Math.random() * 4 + 1)}.jpg`;
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
      pluck<ProgressEvent, string>('currentTarget', 'result')
    );
  }
}
