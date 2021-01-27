import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) {
    this.http.get<SongResponse>('/Songs?page=1&size=10').subscribe(res => {
      console.log('tester', res[0].title)
    })
    // this.http.get<any>('http://localhost:5000/Songs?page=1&size=10').subscribe(res => {
    //   this.test = res;
    //   console.log('tester', res.name)
      
    // })
  }
}

type SongResponse = paths["/Songs"]["get"]["responses"][200]["text/plain"];