import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBacklogComponent } from './song-backlog.component';

describe('SongBacklogComponent', () => {
  let component: SongBacklogComponent;
  let fixture: ComponentFixture<SongBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongBacklogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
