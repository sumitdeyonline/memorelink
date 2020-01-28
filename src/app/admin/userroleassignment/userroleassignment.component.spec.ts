import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleassignmentComponent } from './userroleassignment.component';

describe('UserroleassignmentComponent', () => {
  let component: UserroleassignmentComponent;
  let fixture: ComponentFixture<UserroleassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
