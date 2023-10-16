import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyForSwapComponent } from './ready-for-swap.component';

describe('ReadyForSwapComponent', () => {
  let component: ReadyForSwapComponent;
  let fixture: ComponentFixture<ReadyForSwapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyForSwapComponent]
    });
    fixture = TestBed.createComponent(ReadyForSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
