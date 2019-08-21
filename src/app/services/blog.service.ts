import { Injectable } from '@angular/core';
import { PostPreview } from '../models/post-legacy';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  latest$ = of<PostPreview[]>([
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'How to write songs',
      brief: 'viverra ad cubilia arcu velit iaculis hac primis nam suscipit, lacinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'How to be DJ',
      brief: 'acinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Get Started with Macbook',
      brief: 'acinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Mandarin 101',
      brief: 'acinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Mandarin 102',
      brief: 'acinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Window of the world',
      brief: 'acinia et nascetur dui vulputate cras',
      createDate: new Date(Date.now())
    }
  ])
  
  total: number;

  constructor() { }
}
