import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../models/Announcement';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() latest$?: Observable<Announcement[]> = this.contents.announcement('1', '10');

  constructor(private contents: ContentService) { }

  ngOnInit() {
  }

}
