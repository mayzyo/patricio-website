import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../models';

@Component({
  selector: 'app-quick-player',
  templateUrl: './quick-player.component.html',
  styleUrls: ['./quick-player.component.scss']
})
export class QuickPlayerComponent implements OnInit {
  @Input() song!: Song;
  @Input() backgroundUrl: string | null = '';

  constructor() { }

  ngOnInit(): void {
  }

}
