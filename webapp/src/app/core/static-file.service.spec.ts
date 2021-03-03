import { TestBed } from '@angular/core/testing';

import { StaticFileService } from './static-file.service';

describe('StaticFileService', () => {
  let service: StaticFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
