import { Component, OnInit } from '@angular/core';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { ContentService } from 'src/app/services/image.service';
import { HttpClient } from '@angular/common/http';
import { Music } from 'src/app/models/Music';
import { merge, of, BehaviorSubject, from } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';
import { rapidFire } from 'src/app/utils/custom-operators';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  readonly quote$ = this.quotes.unique$('music');

  readonly updateMusics$ = new BehaviorSubject<number>(1);
  readonly musics$ = this.updateMusics$.pipe(
    map(res => ({ page: res.toString(), size: '8' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res })),
    tap(res => setTimeout(() => this.more = res.length >= 8, 2700)),
    switchMap(res => from(res).pipe(
      map(res => ({
        ...res,
        date: res.date && new Date(res.date).toDateString(),
        active: false,
        playing: false,
        audio$: res.audioKey && this.contents.get(`/api/musics/audios/${res.audioKey}`),
        cover$: res.thumbnail && merge(
          of(res.thumbnail),
          this.contents.get(`/api/musics/covers/${res.coverKey}`)
        )
      })),
      rapidFire(300),
    )),
    scan<unknown, unknown[]>((acc, cur) => [ ...acc, cur ], [])
  );
  
  playing: Music;
  more: boolean;

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private contents: ContentService,
    private admin: AdminService,
  ) { }

  ngOnInit() {
  }  

  showMore() {
    this.more = false;
    this.updateMusics$.next(this.updateMusics$.value + 1);
  }

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}