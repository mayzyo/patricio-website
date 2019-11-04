import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, useAnimation, state } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ImageService } from '../services/image.service';
import { landingFadeIn } from '../animations/fade-in';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
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
    trigger('fadeObj', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' }))
    ]),
  ]
})
export class HighlightComponent implements OnInit {

  @Input() datasource$: Observable<HighlightItem[]>;
  @Input() animState: boolean = true;

  highlights$: Observable<any>;

  constructor(private images: ImageService) { }

  ngOnInit() {
    this.highlights$ = this.datasource$.pipe(
      map(res =>
        res.map(el => ({
          ...el,
          thumbnail: this.images.stockGallery()
        }))
      ),
      map(res => this.divideItems(res)),
    );
  }

  private divideItems(items: HighlightItem[]) {
    return {
      cardXL: items[0],
      cardL: items[1],
      cardM: items.length > 3 && [...items].splice(2, 3),
      cardS: items.length > 5 && [...items].splice(5, items.length - 5)
    }
  }
}

export interface HighlightItem {
  title: string;
  link: string;
  brief?: string;
  thumbnail: any;
}