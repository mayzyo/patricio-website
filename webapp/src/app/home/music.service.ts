import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  highlights$: Observable<Song[]> = this.http.get<Song[]>('http://localhost:5000/Songs');
  get$: Observable<Song[]> = this.http.get<Song[]>('http://localhost:5000/Songs');

  constructor(private http: HttpClient) {
  }
}