import { TestBed } from '@angular/core/testing';

import { FamousQuoteService } from './famous-quote.service';

describe('FamousQuoteService', () => {
  let service: FamousQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamousQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
