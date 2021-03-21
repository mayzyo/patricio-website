import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPlayerComponent } from './full-player.component';

describe('FullPlayerComponent', () => {
  let component: FullPlayerComponent;
  let fixture: ComponentFixture<FullPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
