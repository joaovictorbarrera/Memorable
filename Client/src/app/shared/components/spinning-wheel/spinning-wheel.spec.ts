import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningWheel } from './spinning-wheel';

describe('SpinningWheel', () => {
  let component: SpinningWheel;
  let fixture: ComponentFixture<SpinningWheel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinningWheel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinningWheel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
