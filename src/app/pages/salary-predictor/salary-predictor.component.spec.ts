import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPredictorComponent } from './salary-predictor.component';

describe('SalaryPredictorComponent', () => {
  let component: SalaryPredictorComponent;
  let fixture: ComponentFixture<SalaryPredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryPredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
