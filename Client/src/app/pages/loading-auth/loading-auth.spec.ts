import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAuth } from './loading-auth';

describe('LoadingAuth', () => {
  let component: LoadingAuth;
  let fixture: ComponentFixture<LoadingAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
