import { Injectable } from '@angular/core';
import { of, fromEvent, merge, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, pluck, map, scan, shareReplay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  readonly portrait$ = this.http.get('api/image/portrait', { responseType: 'blob' }).pipe(
    switchMap(res => {
      const reader = new FileReader();
      const ob$ = fromEvent(reader, 'load');
      reader.readAsDataURL(res);
      return ob$;
    }),
    pluck<ProgressEvent, string>('currentTarget', 'result')
  );

  constructor(
    private http: HttpClient
  ) { }

  stockGallery(index?: number) {
    return `./assets/images/stock-${index || Math.floor(Math.random() * 4 + 1)}.jpg`;
  }

  stockGallery$(index?: number) {
    return of(this.stockGallery(index));
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
