import { TestBed } from '@angular/core/testing';

import { FeedFormService } from './feed-form.service';

describe('FeedFormService', () => {
  let service: FeedFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
