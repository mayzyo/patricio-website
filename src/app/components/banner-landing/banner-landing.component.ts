import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/Quote';

@Component({
  selector: 'app-banner-landing',
  templateUrl: './banner-landing.component.html',
  styleUrls: ['./banner-landing.component.scss']
})
export class BannerLandingComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() quote$: Observable<Quote>;
  @Output() onScrolldown = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  scrolldown() {
    this.onScrolldown.emit();
  }
}
