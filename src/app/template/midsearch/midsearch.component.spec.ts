import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidsearchComponent } from './midsearch.component';

describe('MidsearchComponent', () => {
  let component: MidsearchComponent;
  let fixture: ComponentFixture<MidsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
