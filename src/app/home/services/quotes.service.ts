import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map, shareReplay } from 'rxjs';
import { Quote } from 'src/app/models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private readonly quotes$: Observable<Quote[]>;
  private readonly tracker = new Map<string, Quote>();

  constructor(private firestore: Firestore) {
    const fetchedQuotes$ = collectionData(collection(this.firestore, 'quotes')) as Observable<Quote[]>;
    this.quotes$ = fetchedQuotes$.pipe(
      shareReplay(1)
    );
  }

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

    if (!this.tracker.has(key)) {
      this.tracker.set(key, quotes[Math.floor(Math.random() * quotes.length)]);
    }

    return this.tracker.get(key) || { message: '', author: '' };
  }
}
