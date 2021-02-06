import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightReelComponent } from './highlight-reel.component';

describe('HighlightReelComponent', () => {
  let component: HighlightReelComponent;
  let fixture: ComponentFixture<HighlightReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightReelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
