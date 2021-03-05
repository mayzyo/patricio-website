import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  breakpoint$ = this.breakpointObserver.observe('(min-width: 1024px)').pipe(
    map(res => res.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver, public media: MediaService) { }

  ngOnInit(): void {
  }

}
