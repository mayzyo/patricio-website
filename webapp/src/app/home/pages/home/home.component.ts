import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  test = from([
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' },
    { title: 'Touchable Title', backgroundUrl: 'assets/images/banner-1.jpg' }
])
  constructor() { }

  ngOnInit(): void {
  }

}
