import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.scss']
})
export class MusicGalleryComponent implements OnInit {

  constructor(public musics: MusicService) { }

  ngOnInit(): void {
  }

}
