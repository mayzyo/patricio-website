import { Component, OnInit } from '@angular/core';
import { trigger, group, transition, animate, style, query, useAnimation, sequence, stagger, state } from '@angular/animations';
import { landingFadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { map } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.card')),
  // ]
  animations: [
    trigger('fadeIn', [
      transition(`* => *`, [
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

  readonly quote$ = this.contents.randomQuote$;
  readonly workList$ = this.contents.workList$.pipe(
    map(res => 
      res.map(el => ({
        ...el,
        // image$: el.image ? this.images.imageFromGoogleDrive(el.image) : this.images.stockGallery()
        image$: el.image ? this.images.imageBypass('work', el.image) : this.images.stockGallery$()
      }))
    )
  );

  constructor(private contents: ContentService, private images: ImageService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
