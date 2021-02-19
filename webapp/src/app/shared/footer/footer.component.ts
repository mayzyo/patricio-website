import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faInstagram, faSoundcloud, faWeixin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faInstagram = faInstagram;
  faSoundcloud = faSoundcloud;
  faWeixin = faWeixin;

  constructor() { }

  ngOnInit(): void {
  }

}
