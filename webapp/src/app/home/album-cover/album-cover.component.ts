import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-album-cover',
  templateUrl: './album-cover.component.html',
  styleUrls: ['./album-cover.component.scss']
})
export class AlbumCoverComponent implements OnInit {
  @Input() coverImage?: SafeUrl | string | null;

  constructor() { }

  ngOnInit(): void {
  }
}
