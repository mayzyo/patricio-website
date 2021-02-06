import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchableEComponent } from './touchable-e.component';

describe('TouchableEComponent', () => {
  let component: TouchableEComponent;
  let fixture: ComponentFixture<TouchableEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouchableEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchableEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
