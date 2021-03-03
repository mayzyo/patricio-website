import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  highlights$: Observable<Song[]> = this.http.get<Song[]>(`${environment.backend}/Songs`);
  get$: Observable<Song[]> = this.http.get<Song[]>(`${environment.backend}/Songs`);

  constructor(private http: HttpClient) {
  }
}