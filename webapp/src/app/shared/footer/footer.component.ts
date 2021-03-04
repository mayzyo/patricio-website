import { Component, Input, OnInit } from '@angular/core';
import { faFacebookSquare, faInstagram, faSoundcloud, faWeixin } from '@fortawesome/free-brands-svg-icons';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  readonly faFacebookSquare = faFacebookSquare;
  readonly faInstagram = faInstagram;
  readonly faSoundcloud = faSoundcloud;
  readonly faWeixin = faWeixin;
  
  @Input() isActive?: boolean;

  constructor(public navigations: NavigationService) { }

  ngOnInit(): void {
  }

}
