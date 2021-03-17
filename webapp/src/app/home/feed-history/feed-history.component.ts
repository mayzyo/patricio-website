import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-feed-history',
  templateUrl: './feed-history.component.html',
  styleUrls: ['./feed-history.component.scss']
})
export class FeedHistoryComponent implements OnInit {
  @Output() showArchive = new EventEmitter();

  readonly months = [
    "", "January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "december"
  ]

  constructor(public socials: SocialService) { }

  ngOnInit(): void {
  }
}