import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchableBComponent } from './touchable-b.component';

describe('TouchableBComponent', () => {
  let component: TouchableBComponent;
  let fixture: ComponentFixture<TouchableBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchableBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchableBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
