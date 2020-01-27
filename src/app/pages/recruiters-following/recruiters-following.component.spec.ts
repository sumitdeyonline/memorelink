import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersFollowingComponent } from './recruiters-following.component';

describe('RecruitersFollowingComponent', () => {
  let component: RecruitersFollowingComponent;
  let fixture: ComponentFixture<RecruitersFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitersFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitersFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
