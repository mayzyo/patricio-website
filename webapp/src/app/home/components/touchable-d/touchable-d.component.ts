import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-touchable-d',
  templateUrl: './touchable-d.component.html',
  styleUrls: ['../touchable-a/touchable-a.component.scss', './touchable-d.component.scss']
})
export class TouchableDComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backgroundUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
