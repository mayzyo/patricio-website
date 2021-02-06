import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchableCComponent } from './touchable-c.component';

describe('TouchableCComponent', () => {
  let component: TouchableCComponent;
  let fixture: ComponentFixture<TouchableCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchableCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchableCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
