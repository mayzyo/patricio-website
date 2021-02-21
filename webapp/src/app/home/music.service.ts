import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  highlights$: Observable<Song[]> = this.http.get<Song[]>('/Songs');
  get$: Observable<Song[]> = this.http.get<Song[]>('/Songs');;

  constructor(private http: HttpClient) {
    // this.http.get<any>('http://localhost:5000/Songs?page=1&size=10').subscribe(res => {
    //   this.test = res;
    //   console.log('tester', res.name)
      
    // })
  }
}