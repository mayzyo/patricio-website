import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/models/Quote';
import { Moment } from 'src/app/models/Moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() quote$: Observable<Quote>;
  @Input() backgroundUrl: string;

  readonly previews$ = this.http.get<Moment[]>('/api/media/gallery').pipe(
    map(res => res.map(el => el.image))
  );

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
}
