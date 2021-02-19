import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-update-feed',
  templateUrl: './update-feed.component.html',
  styleUrls: ['./update-feed.component.scss']
})
export class UpdateFeedComponent implements OnInit {

  constructor(private socials: SocialService) { }

  ngOnInit(): void {
  }

}
