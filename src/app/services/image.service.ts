import { Injectable } from '@angular/core';
import { of, bindCallback, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, first, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  galleryThumbnails$ = of<Array<{ id: string; img: string; }>>([
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
    { id: 'a', img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg` },
  ]);

  galleryTotal: number;

  constructor(private http: HttpClient) { }

  public galleryImage(id: string) {
    return of(`./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`)
  }

  imageBypass(url: string) {
    return this.http.get('api/image/bypass', { params: { url }, responseType: 'blob' }).pipe(
      switchMap(res => {
        const reader = new FileReader();
        const ob$ = fromEvent(reader, 'load');
        reader.readAsDataURL(res);
        return ob$;
      }),
      pluck<ProgressEvent, string>('currentTarget', 'result')
    );
  }
}
