import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGalleryComponent } from './song-gallery.component';

describe('SongGalleryComponent', () => {
  let component: SongGalleryComponent;
  let fixture: ComponentFixture<SongGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
