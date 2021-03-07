import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Output() closePanel = new EventEmitter();

  constructor(public media: MediaService) { }

  ngOnInit(): void {
  }

}
