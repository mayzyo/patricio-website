import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-banner-landing',
  templateUrl: './banner-landing.component.html',
  styleUrls: ['./banner-landing.component.scss']
})
export class BannerLandingComponent implements OnInit {

  @Output() onScrolldown = new EventEmitter();
  readonly quote$ = this.contents.randomQuote$;

  constructor(private contents: ContentService) { }

  ngOnInit() {
  }

  scrolldown() {
    this.onScrolldown.emit();
  }
}
