import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamousQuoteService {
  readonly random$ = this.http.get(`${environment.backend}/Quotes`);

  constructor(private http: HttpClient) { }

  public random() {
    return {
      author: 'Charles Schwab',
      message: 'Be hearty in your approbation and lavish in your praise.'
    }
  }
}
