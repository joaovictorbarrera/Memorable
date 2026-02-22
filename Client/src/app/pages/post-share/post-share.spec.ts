import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShare } from './post-share';

describe('PostShare', () => {
  let component: PostShare;
  let fixture: ComponentFixture<PostShare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostShare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostShare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
