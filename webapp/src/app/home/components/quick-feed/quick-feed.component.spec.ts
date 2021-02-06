import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFeedComponent } from './quick-feed.component';

describe('QuickFeedComponent', () => {
  let component: QuickFeedComponent;
  let fixture: ComponentFixture<QuickFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
