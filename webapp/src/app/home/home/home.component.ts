import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animate$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.animate$.next();
  }


}
