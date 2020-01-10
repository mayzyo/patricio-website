import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly facebook$ = this.contents.profile$.pipe(
    pluck('facebook')
  );
  readonly linkedin$ = this.contents.profile$.pipe(
    pluck('linkedin')
  );
  readonly instagram$ = this.contents.profile$.pipe(
    pluck('instagram')
  );
  readonly wechat$ = this.contents.profile$.pipe(
    pluck('wechat')
  );
  readonly weibo$ = this.contents.profile$.pipe(
    pluck('weibo')
  );

  constructor(private contents: ContentService) { }

  ngOnInit() {
  }

}
