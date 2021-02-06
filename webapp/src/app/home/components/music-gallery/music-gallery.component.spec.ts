import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGalleryComponent } from './music-gallery.component';

describe('MusicGalleryComponent', () => {
  let component: MusicGalleryComponent;
  let fixture: ComponentFixture<MusicGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
