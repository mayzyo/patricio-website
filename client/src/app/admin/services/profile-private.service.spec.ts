import { TestBed } from '@angular/core/testing';

import { ProfilePrivateService } from './profile-private.service';

describe('ProfilePrivateService', () => {
  let service: ProfilePrivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePrivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
