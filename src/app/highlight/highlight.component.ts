import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  @Input() datasource$: Observable<HighlightItem[]>;
  highlights$: Observable<any>;

  constructor(private images: ImageService) { }

  ngOnInit() {
    this.highlights$ = this.datasource$.pipe(
      map(res =>  
        res.map(el => ({
          ...el,
          thumbnail: this.images.stockGallery()
        }))
      ),
      map(res => this.divideItems(res)),
    );
  }

  private divideItems(items: HighlightItem[]) {
    return {
      cardXL: items[0],
      cardL: items[1],
      cardM: items.length > 3 && [...items].splice(2, 3),
      cardS: items.length > 5 && [...items].splice(5, items.length - 5)
    }
  }
}

export interface HighlightItem {
  title: string;
  link: string;
  brief?: string;
  thumbnail: any;
}