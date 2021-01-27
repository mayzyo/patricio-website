import { Component, OnInit } from '@angular/core';
import { FamousQuoteService } from '../../services/famous-quote.service';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { AnimationEvent, transition, trigger, useAnimation } from '@angular/animations';
import { cueAnimation } from '../../animations/cue.animation';

@Component({
  selector: 'app-banner-a',
  templateUrl: './banner-a.component.html',
  animations: [
    trigger('cue', [
      transition('* => true', useAnimation(cueAnimation))
    ])
  ],
  styleUrls: ['./banner-a.component.scss']
})
export class BannerAComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  quote = this.famousQuote.random();
  cueActive: boolean = false;

  constructor(private famousQuote: FamousQuoteService) { }

  ngOnInit(): void {
    this.loopCueAnimation();
  }

  loopCueAnimation(event?: AnimationEvent) {
    this.cueActive = false;
    setTimeout(() => this.cueActive = true, 5000);
  }

  scrollDown() {

  }
}