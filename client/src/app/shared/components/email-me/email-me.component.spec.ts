import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMeComponent } from './email-me.component';

describe('EmailMeComponent', () => {
  let component: EmailMeComponent;
  let fixture: ComponentFixture<EmailMeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailMeComponent]
    });
    fixture = TestBed.createComponent(EmailMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
