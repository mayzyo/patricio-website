import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  biography$: Observable<Article> = this.http.get<Article[]>('/Articles')
  .pipe(
    map(res => res[0])
  );

  constructor(private http: HttpClient) { }
}