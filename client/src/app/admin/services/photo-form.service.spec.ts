import { TestBed } from '@angular/core/testing';

import { PhotoFormService } from './photo-form.service';

describe('PhotoFormService', () => {
  let service: PhotoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
