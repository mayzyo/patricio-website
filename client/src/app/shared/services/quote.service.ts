import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Quote } from '../../models/quote';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private readonly firestore = inject(Firestore);

    private readonly list$ = this.initialiseList();
    private readonly tracker = new Map<string, Quote>();

    unique$(pageName: string) {
        return this.list$.pipe(
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
        
        return this.tracker.get(key);
    }

    private initialiseList(): Observable<Quote[]> {
        const quotes = collection(this.firestore, 'quotes');
        const quotes$ = collectionData(query(quotes)) as Observable<Quote[]>;

        return quotes$.pipe(take(1));
    }
}
