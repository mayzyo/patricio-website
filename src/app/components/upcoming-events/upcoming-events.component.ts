import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, useAnimation, state } from '@angular/animations';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';
import { landingFadeIn } from '../../animations/fade-in';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(`* => true`, [
        query('.media', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
    trigger('fadeObj', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ]),
  ]
})
export class UpcomingEventsComponent implements OnInit {

  @Input() datasource$?: Observable<Announcement[]>;
  @Input() animState?: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
