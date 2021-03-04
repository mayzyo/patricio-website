import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit, OnDestroy {

  constructor(private navigations: NavigationService) { }

  ngOnInit(): void {
    this.navigations.footer = false;
  }

  ngOnDestroy(): void {
    this.navigations.footer = true;
  }
}
