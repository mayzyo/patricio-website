import { Component, OnInit } from '@angular/core';
import { pluck, map, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private readonly profile$ = this.http.get<Profile>('/api/profile').pipe(
    share()
  );

  readonly facebook$ = this.profile$.pipe(
    pluck('facebook')
  );
  readonly linkedin$ = this.profile$.pipe(
    pluck('linkedin')
  );
  readonly instagram$ = this.profile$.pipe(
    pluck('instagram')
  );
  readonly wechat$ = this.profile$.pipe(
    pluck('wechat')
  );
  readonly weibo$ = this.profile$.pipe(
    pluck('weibo')
  );

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

}
