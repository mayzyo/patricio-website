import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { switchMap, merge, map, scan } from 'rxjs/operators';
import { Moment } from '../../models/Moment';
import { ImageService } from '../../services/image.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() background: string;

  readonly quote$ = this.contents.randomQuote$;
  // readonly carousel$ = combineLatest(
  //   this.images.stockGallery(),
  //   this.images.stockGallery(),
  //   this.images.stockGallery(),
  //   this.images.stockGallery(),
  //   this.images.stockGallery()
  // )
  readonly carousel$ = this.images.gallery$;

  constructor(private contents: ContentService, private images: ImageService) {
    
  }

  ngOnInit() {
  }
}
