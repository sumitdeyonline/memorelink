import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumedetailsComponent } from './resumedetails.component';

describe('ResumedetailsComponent', () => {
  let component: ResumedetailsComponent;
  let fixture: ComponentFixture<ResumedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
