import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/Quote';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private readonly quotes$ = this.http.get<Quote[]>('/api/quotes/random');
  private readonly tracker = new Map<string, Quote>();

  constructor(private http: HttpClient) { }

  unique$(pageName: string) {
    return this.quotes$.pipe(
      map(res => this.allocateQuote(pageName, res))
    );
  }

  private allocateQuote(key: string, quotes: Quote[]) {
    this.tracker.forEach(el => 
      quotes.splice(
        quotes.findIndex(x => x.message == el.message), 
        1
      )
    );

    if(!this.tracker.has(key))
      this.tracker.set(key, quotes[Math.floor(Math.random() * quotes.length)]);
    return this.tracker.get(key);
  }
}
