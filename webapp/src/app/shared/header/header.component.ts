import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { faGuitar, faMusic, faHome } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly faGuitar = faGuitar;
  readonly faMusic = faMusic;
  readonly faHome = faHome;

  readonly breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
}