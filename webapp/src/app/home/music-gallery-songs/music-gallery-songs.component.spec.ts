import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGallerySongsComponent } from './music-gallery-songs.component';

describe('MusicGallerySongsComponent', () => {
  let component: MusicGallerySongsComponent;
  let fixture: ComponentFixture<MusicGallerySongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicGallerySongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicGallerySongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
