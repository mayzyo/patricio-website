import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-touchable-c',
  templateUrl: './touchable-c.component.html',
  styleUrls: ['../touchable-a/touchable-a.component.scss', './touchable-c.component.scss']
})
export class TouchableCComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backgroundUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
