import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeServiceComponent } from './resume-service.component';

describe('ResumeServiceComponent', () => {
  let component: ResumeServiceComponent;
  let fixture: ComponentFixture<ResumeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
