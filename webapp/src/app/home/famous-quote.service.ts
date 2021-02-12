import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FamousQuoteService {
  
  constructor() { }

  public random() {
    return {
      author: 'Charles Schwab',
      message: 'Be hearty in your approbation and lavish in your praise.'
    }
  }
}
