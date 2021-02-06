import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-touchable-b',
  templateUrl: './touchable-b.component.html',
  styleUrls: ['../touchable-a/touchable-a.component.scss', './touchable-b.component.scss']
})
export class TouchableBComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backgroundUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
