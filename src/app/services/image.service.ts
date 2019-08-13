import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

  constructor() { }

  public galleryImage(id: string) {
    return of(`./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`)
  }
}
