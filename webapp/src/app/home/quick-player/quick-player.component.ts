import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faPlayCircle, faStopCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { Song } from "../models";

@Component({
  selector: 'app-quick-player',
  templateUrl: './quick-player.component.html',
  styleUrls: ['./quick-player.component.scss']
})
export class QuickPlayerComponent implements OnInit {
  readonly faPlayCircle = faPlayCircle;
  readonly faStopCircle = faStopCircle;
  readonly faSoundcloud = faSoundcloud;
  readonly faInfoCircle = faInfoCircle;
  @Input() song!: Readonly<Song>;
  @Input() isActive: boolean = false;
  isAudioOn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.isActive = true;
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if(!this.isAudioOn) {
      this.isActive = false;
    }
  }

  toggleAudio() {
    this.isAudioOn = !this.isAudioOn;
  }
}