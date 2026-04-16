import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowModal } from './follow-modal';

describe('FollowModal', () => {
  let component: FollowModal;
  let fixture: ComponentFixture<FollowModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
