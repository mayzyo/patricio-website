import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-quick-feed',
  templateUrl: './quick-feed.component.html',
  styleUrls: ['./quick-feed.component.scss']
})
export class QuickFeedComponent implements OnInit {

  constructor(private socials: SocialService) { }

  ngOnInit(): void {

  }

}