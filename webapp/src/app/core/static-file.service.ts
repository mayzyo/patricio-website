import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticFileService {
  apiKey = 'a41c3cc0353620d6ce383521be6a207b';

  constructor(private http: HttpClient) { }

  get(fileName: string) {
    const params = { containerName: 'patriciopersonal', fileName };
    return this.http.get(
      `${environment.media}`,
      { params, responseType: 'blob', headers: { 'kfntech-key': this.apiKey } }
    ).pipe(
      map(res => window.URL.createObjectURL(res))
    );
  }
}
