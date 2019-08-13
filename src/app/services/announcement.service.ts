import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventAnnouncement, Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  collection$ = of<Announcement[]>([
    {
      title: 'I am going to Japan',
      description: 'viverra ad cubilia arcu velit iaculis hac primis nam suscipit, lacinia et nascetur dui vulputate cras',
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Slush 2019',
      description: 'Slush 2019 cubilia arcu velit iaculis',
      type: 'Event'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Early Stage',
      description: 'Early Stage nascetur dui vulputate cras',
      type: 'Event'
    },
    {
      title: 'Start Teaching at SZ Uni',
      description: 'viverra ad cubilia arcu velit iaculis hac primis nam suscipit, lacinia et nascetur dui vulputate cras',
    }
  ])

  latestEvents$ = of<EventAnnouncement[]>([
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Slush 2019',
      description: 'Slush 2019 cubilia arcu velit iaculis',
      type: 'Event'
    },
    {
      img: `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`,
      title: 'Early Stage',
      description: 'Early Stage nascetur dui vulputate cras',
      type: 'Event'
    },
  ]);

  eventTotal: number;

  constructor() { }
}
