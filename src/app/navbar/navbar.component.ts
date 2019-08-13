import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  currentUrl: string;

  constructor(private router: Router, private location: Location) {
    this.location.onUrlChange(res => {
      this.currentUrl = res;
      this.isCollapsed = true;
    });
  }

  ngOnInit() {
  }

}
