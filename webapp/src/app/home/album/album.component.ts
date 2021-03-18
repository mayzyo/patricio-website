import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from '../models';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  @Input() backgroundUrl: string | null = '';
  @Output() selectAlbum = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
