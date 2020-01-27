import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpoststatusComponent } from './jobpoststatus.component';

describe('JobpoststatusComponent', () => {
  let component: JobpoststatusComponent;
  let fixture: ComponentFixture<JobpoststatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpoststatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpoststatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
