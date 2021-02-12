import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPlayerComponent } from './quick-player.component';

describe('QuickPlayerComponent', () => {
  let component: QuickPlayerComponent;
  let fixture: ComponentFixture<QuickPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
