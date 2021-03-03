import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StaticFileService } from '../core/static-file.service';
import { Article } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  banner$: Observable<string> = this.staticFiles.get('home-banner.jpg');
  biography$: Observable<Article> = this.http.get<Article[]>(`${environment.backend}/Articles`)
    .pipe(
      map(res => res[0])
    );

  constructor(private http: HttpClient, private staticFiles: StaticFileService) { }
}