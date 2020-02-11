import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, query, useAnimation, stagger } from '@angular/animations';
import { landingFadeIn } from 'src/app/animations/fade-in';
import { map } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';
import { HttpClient } from '@angular/common/http';
import { Music } from 'src/app/models/Music';
import { Observable } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  // animations: [
  //   trigger('fadeIn', fadeIn('.card')),
  // ]
  animations: [
    trigger('fadeIn', [
      transition(`* => *`, [
        query('.card', [
          style({ opacity: '0' }),
          stagger(300, [
            useAnimation(landingFadeIn, {
              params: {
                transform: 'translateY(20px)',
                opacity: '0',
              }
            })
          ])
        ]),
      ])
    ]),
  ]
})
export class MusicComponent implements OnInit {

  readonly quote$ = this.quotes.procedure$('media');
  readonly musics$ = this.http.get<Music[]>('/api/music').pipe(
    map(res => this.setupImageStreams(res))
  );

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private images: ImageService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  private setupImageStreams(musics: Music[]): MusicViewModel[] {
    return musics.map((el, i) => ({ 
      ...el, 
      image$: this.images.readAsBase64$(
        this.http.get(
          '/api/music/cover', 
          { params: { index: i.toString() }, responseType: 'blob' }
        )
      )
    }))
  }
}

type MusicViewModel = Music & { image$: Observable<unknown> }