import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import metaData from 'src/meta-data';
import { slideInAnimation } from '../slide-in.animation';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('void => *', [useAnimation(slideInAnimation)])
    ])
  ]
})
export class BiographyComponent implements OnInit {
  @Input() animate$!: Observable<void>;
  readonly portrait: string = metaData.homeBannerUrl;
  readonly biography: string = metaData.biography;
  isActive$?: Observable<boolean>;
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isActive$ = this.animate$.pipe(mapTo(true));
  }

}
