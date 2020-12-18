import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  State = State;
  pageState: State;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.pipe(take(1)).subscribe(res => {
      if(res[0]) {
        this.pageState = res[0].path as State;
      } else {
        this.pageState = State.PRIVACY;
      }
    })
  }

}

enum State {
  NONE = '',
  PRIVACY = 'privacy-policy',
  TERMS = 'terms-and-conditions'
}