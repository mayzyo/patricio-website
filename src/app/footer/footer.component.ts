import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly instagram$ = this.contents.profile$.pipe(
    pluck('instagram')
  );
  readonly linkedin$ = this.contents.profile$.pipe(
    pluck('linkedin')
  );

  constructor(private contents: ContentService) { }

  ngOnInit() {
  }

}
