import { TestBed } from '@angular/core/testing';

import { SocialMediaFormService } from './social-media-form.service';

describe('SocialMediaFormService', () => {
  let service: SocialMediaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialMediaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
