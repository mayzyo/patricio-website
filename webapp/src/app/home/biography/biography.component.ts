import { Component, OnInit } from '@angular/core';
import metaData from 'src/meta-data';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {
  readonly portrait: string = metaData.homeBannerUrl;
  readonly biography: string = metaData.biography;
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
