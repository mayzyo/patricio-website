import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {
  datasource$ = of([
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' }
  ]);

  datasource = [
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' },
    { imageUrl: 'assets/images/banner-1.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
