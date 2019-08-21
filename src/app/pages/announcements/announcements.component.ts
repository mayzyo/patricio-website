import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn('.tester')),
  ]
})
export class AnnouncementsComponent implements OnInit {

  latest$ = this.announcements.collection$;
  readonly quote$ = this.contents.randomQuote$;

  constructor(private announcements: AnnouncementService, private contents: ContentService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
