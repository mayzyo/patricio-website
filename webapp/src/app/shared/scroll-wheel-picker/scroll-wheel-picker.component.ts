import { Component, OnInit } from '@angular/core';
import { faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-wheel-picker',
  templateUrl: './scroll-wheel-picker.component.html',
  styleUrls: ['./scroll-wheel-picker.component.scss']
})
export class ScrollWheelPickerComponent implements OnInit {
  faGuitar = faGuitar;
  faMusic = faMusic;

  constructor() { }

  ngOnInit(): void {
  }

}
