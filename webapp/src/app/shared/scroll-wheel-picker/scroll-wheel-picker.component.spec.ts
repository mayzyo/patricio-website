import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollWheelPickerComponent } from './scroll-wheel-picker.component';

describe('ScrollWheelPickerComponent', () => {
  let component: ScrollWheelPickerComponent;
  let fixture: ComponentFixture<ScrollWheelPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollWheelPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollWheelPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
