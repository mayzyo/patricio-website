import { Injectable } from '@angular/core';
import { of, fromEvent, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, pluck, map, scan, shareReplay, take } from 'rxjs/operators';
import { ContentService } from './content.service';
import { Moment } from '../models/Moment';

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

  readonly gallery$ = this.contents.momentPreview$.pipe(
    switchMap(res => 
      merge(...res.slice(0, 10).map(el => 
        this.imageBypass('moment', el.image).pipe(
          map(x => {
            el.image = x;
            return el;
          })
        )
      ))
    ),
    scan((acc, cur:Moment) => acc.concat(cur), new Array<Moment>()),
    shareReplay(1)
  );

  constructor(private http: HttpClient, private contents: ContentService) {
    this.gallery$.pipe(take(1)).subscribe();
  }

  stockGallery(index?: number) {
    return `./assets/images/stock-${index || Math.floor(Math.random() * 4 + 1)}.jpg`;
  }

  stockGallery$(index?: number) {
    return of(this.stockGallery(index));
  }

  imageFromSource(url: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap(res => {
        const reader = new FileReader();
        const ob$ = fromEvent(reader, 'load');
        reader.readAsDataURL(res);
        return ob$;
      }),
      pluck<ProgressEvent, string>('currentTarget', 'result')
    );
  }

  imageBypass(origin: 'moment' | 'work', url: string) {
    return this.http.get(`api/image/${origin}`, { params: { url }, responseType: 'blob' }).pipe(
      switchMap(res => {
        const reader = new FileReader();
        const ob$ = fromEvent(reader, 'load');
        reader.readAsDataURL(res);
        return ob$;
      }),
      pluck<ProgressEvent, string>('currentTarget', 'result')
    );
  }

  imageFromGoogleDrive(url: string)
  {
    const googleApi = "https://drive.google.com/uc?export=view&id=";

    const start = url.indexOf('/d/') + 3;
    const end = url.lastIndexOf('/view');
    return of(googleApi.concat(url.substring(start, end)));
  }
}
