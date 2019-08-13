import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn('.row')),
  ]
})
export class WorksComponent implements OnInit {

  workList$ = this.works.collection$;

  constructor(private works: WorkService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
