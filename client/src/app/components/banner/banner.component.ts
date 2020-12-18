import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/Quote';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() quote$: Observable<Quote>;
  @Input() backgroundUrl: string;
  @Input() altColour: string;

  constructor() { }

  ngOnInit() {
  }

  onStyle() {
    return {
      'background-color': this.altColour,
      'background-image': `url(../../assets/images/${this.backgroundUrl})`, 
      'background-size': 'cover',
      'background-position': '50% 75%',
      height: '55vh' 
    };
  }
}
