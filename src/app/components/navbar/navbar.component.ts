import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly animState$ = interval(20000).pipe(
    scan<number, boolean>(acc => !acc, false)
  );

  isCollapsed = true;
  currentUrl: string;
  
  constructor(
    private location: Location,
  ) {
    this.location.onUrlChange(res => {
      this.currentUrl = res;
      this.isCollapsed = true;
    });

  }

  ngOnInit() {
  }
}
