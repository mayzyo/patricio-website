import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paths } from 'src/app/shared/backend.api';

@Injectable()
export class SocialService {
  latest$: Observable<PostResponse>;

  constructor(private http: HttpClient) {
    this.latest$ = this.http.get<PostResponse>('/Posts?page=1&size=10');
  }
}

type PostResponse = paths["/Posts"]["get"]["responses"][200]["text/plain"];