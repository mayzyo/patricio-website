import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.card')),
  // ]
  animations: [
    trigger('fadeIn', [
      transition(`* => true`, [
        query('.card', [
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
  ]
})
export class WorksComponent implements OnInit {

  readonly workList$ = this.contents.workList$.pipe(
    map(res =>  res.map(el => {
      !el.image && (el.image = `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`);
      return el;
    }))
  );

  constructor(private contents: ContentService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
