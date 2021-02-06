import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchableDComponent } from './touchable-d.component';

describe('TouchableDComponent', () => {
  let component: TouchableDComponent;
  let fixture: ComponentFixture<TouchableDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchableDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchableDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
