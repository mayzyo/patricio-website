import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  latest$: Observable<Post[]> = this.http.get<Post[]>(`${environment.backend}/Posts`).pipe(
    map(res => res.slice(0, 3))
  );
  posts$: Observable<Post[]> = this.http.get<Post[]>(`${environment.backend}/Posts`);

  constructor(private http: HttpClient) { }
}