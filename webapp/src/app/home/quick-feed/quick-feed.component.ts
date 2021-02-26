import { Component, OnInit } from '@angular/core';
import { Post } from '../models';
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

  simplify(post: Post): Partial<Post> {
    return {
      heading: post.heading,
      created: post.created
    }
  }
}