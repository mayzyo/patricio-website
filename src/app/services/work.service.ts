import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MusicLegacy } from '../models/music-legacy';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  collection$ = of<MusicLegacy[]>([
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Music Piece A',
      subtitle: 'viverra ad cubilia arcu velit',
      createDate: new Date(Date.now()),
      url: 'www.baidu.com'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Music Piece B',
      subtitle: 'viverra ad cubilia arcu velit',
      createDate: new Date(Date.now()),
      url: 'www.baidu.com'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Music Piece C',
      subtitle: 'viverra ad cubilia arcu velit',
      createDate: new Date(Date.now()),
      url: 'www.baidu.com'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Music Piece D',
      subtitle: 'viverra ad cubilia arcu velit',
      createDate: new Date(Date.now()),
      url: 'www.baidu.com'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Music Piece E',
      subtitle: 'viverra ad cubilia arcu velit',
      createDate: new Date(Date.now()),
      url: 'www.baidu.com'
    },
  ])
  
  total: number;

  constructor() { }
}
