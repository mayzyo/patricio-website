import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-touchable-a',
  templateUrl: './touchable-a.component.html',
  styleUrls: ['./touchable-a.component.scss']
})
export class TouchableAComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backgroundUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

  // @HostBinding('style.background-image')
  // get backgroundImage(): string {
  //   return `url(${this.backgroundUrl})`;
  // }
}
