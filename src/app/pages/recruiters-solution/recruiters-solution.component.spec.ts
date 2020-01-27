import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersSolutionComponent } from './recruiters-solution.component';

describe('RecruitersSolutionComponent', () => {
  let component: RecruitersSolutionComponent;
  let fixture: ComponentFixture<RecruitersSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitersSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitersSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
