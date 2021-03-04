import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedHistoryComponent } from './feed-history.component';

describe('FeedHistoryComponent', () => {
  let component: FeedHistoryComponent;
  let fixture: ComponentFixture<FeedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
