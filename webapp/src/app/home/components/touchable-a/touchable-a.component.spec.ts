import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchableAComponent } from './touchable-a.component';

describe('TouchableAComponent', () => {
  let component: TouchableAComponent;
  let fixture: ComponentFixture<TouchableAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchableAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchableAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
