import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableLabelsComponent } from './scrollable-labels.component';

describe('ScrollableLabelsComponent', () => {
  let component: ScrollableLabelsComponent;
  let fixture: ComponentFixture<ScrollableLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
