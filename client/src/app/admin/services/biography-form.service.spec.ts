import { TestBed } from '@angular/core/testing';

import { BiographyFormService } from './biography-form.service';

describe('BiographyFormService', () => {
  let service: BiographyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiographyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
