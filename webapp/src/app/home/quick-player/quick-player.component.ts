import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { Song } from "../models";

@Component({
  selector: 'app-quick-player',
  templateUrl: './quick-player.component.html',
  styleUrls: ['./quick-player.component.scss']
})
export class QuickPlayerComponent implements OnInit {
  readonly faPlayCircle = faPlayCircle;
  readonly faSoundcloud = faSoundcloud;
  readonly faInfoCircle = faInfoCircle;
  @Input() song!: Readonly<Song>;
  isHover: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.isHover = true;
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHover = false;
  }

  play() {
    console.log('playing song')
  }
}