import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn('.row')),
  ]
})
export class WorksComponent implements OnInit {

  readonly workList$ = this.contents.workList$.pipe(
    map(res =>  res.map(el => {
      !el.image && (el.image = `./assets/images/stock-${Math.floor(Math.random() * 4 + 1)}.jpg`);
      return el;
    }))
  );

  constructor(private contents: ContentService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
