import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbRemoveButtonComponent } from './thumb-remove-button.component';

describe('ThumbRemoveButtonComponent', () => {
  let component: ThumbRemoveButtonComponent;
  let fixture: ComponentFixture<ThumbRemoveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbRemoveButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThumbRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
