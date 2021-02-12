import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paths } from 'src/app/shared/backend.api';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  highlights$: Observable<SongResponse>;

  constructor(private http: HttpClient) {
    this.highlights$ = this.http.get<SongResponse>('/Songs?page=1&size=10');
    // this.http.get<any>('http://localhost:5000/Songs?page=1&size=10').subscribe(res => {
    //   this.test = res;
    //   console.log('tester', res.name)
      
    // })
  }
}

type SongResponse = paths["/Songs"]["get"]["responses"][200]["text/plain"];