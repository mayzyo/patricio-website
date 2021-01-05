import { Component, Input, OnInit } from '@angular/core';
import { faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faGuitar = faGuitar;
  faMusic = faMusic;
  @Input() isActive = true;

  constructor() { }

  ngOnInit(): void {
  }

  onMenuClick() {
    console.log('clicked')
    this.isActive = !this.isActive;
  }
}