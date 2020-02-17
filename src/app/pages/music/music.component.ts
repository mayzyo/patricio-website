import { Component, OnInit } from '@angular/core';
import { map, switchMap, scan, pluck, withLatestFrom } from 'rxjs/operators';
import { ContentService } from 'src/app/services/image.service';
import { HttpClient } from '@angular/common/http';
import { Music } from 'src/app/models/Music';
import { Observable, merge, of, from, zip, interval, BehaviorSubject } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  readonly quote$ = this.quotes.procedure$('music');
  readonly updateBacklog$ = new BehaviorSubject<number>(1);
  readonly backlog$ = this.updateBacklog$.pipe(
    map(res => ({ page: res.toString(), size: '10' })),
    switchMap(res => this.http.get<Music[]>('/api/musics', { params: res })),
    withLatestFrom(this.updateBacklog$),
    scan<[Music[], number], Music[]>((acc, [cur, page]) => page == 1 ? cur : acc.concat(cur), []),
    switchMap(res => from(res)),
  );
  readonly musics$ = zip(
    this.backlog$,
    interval(300)
  ).pipe(
    pluck('0'),
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
    scan<unknown, unknown[]>((acc, cur) => [ ...acc, cur ], [])
  );

  playing: Music;

  constructor(
    private http: HttpClient,
    private quotes: QuotesService,
    private contents: ContentService,
    private admin: AdminService,
  ) { }

  ngOnInit() {
  }  

  loggedIn = this.admin.loggedIn;
  edit(editorType: string) {
    this.admin.open(editorType);
  }
}