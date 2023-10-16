import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToSwapComponent } from './ready-to-swap.component';

describe('ReadyToSwapComponent', () => {
  let component: ReadyToSwapComponent;
  let fixture: ComponentFixture<ReadyToSwapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyToSwapComponent]
    });
    fixture = TestBed.createComponent(ReadyToSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
