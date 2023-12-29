import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditorComponent } from './song-editor.component';

describe('SongEditorComponent', () => {
  let component: SongEditorComponent;
  let fixture: ComponentFixture<SongEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
