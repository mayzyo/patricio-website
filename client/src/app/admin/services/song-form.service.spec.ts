import { TestBed } from '@angular/core/testing';

import { SongFormService } from './song-form.service';

describe('SongFormService', () => {
  let service: SongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
