import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { sequence } from 'src/app/utils/custom-operators';
import { QuickEvent } from '../models';
import { pressDownAnimation } from '../press-down.animation';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-quick-feed',
  templateUrl: './quick-feed.component.html',
  styleUrls: ['./quick-feed.component.scss'],
  animations: [
    trigger('pressDown', [
      transition('void => *', [useAnimation(pressDownAnimation)])
    ])
  ]
})
export class QuickFeedComponent implements OnInit {
  @Input() animate$!: Observable<unknown>;
  latest$?: Observable<QuickEvent[]>;

  constructor(public socials: SocialService) { }

  ngOnInit(): void {
    this.latest$ = this.socials.latest$.pipe(
      sequence(300, this.animate$),
      scan<QuickEvent, QuickEvent[]>((acc, cur) => [...acc, cur], [])
    );
  }
}