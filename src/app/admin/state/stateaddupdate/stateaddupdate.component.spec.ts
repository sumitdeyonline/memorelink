import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateaddupdateComponent } from './stateaddupdate.component';

describe('StateaddupdateComponent', () => {
  let component: StateaddupdateComponent;
  let fixture: ComponentFixture<StateaddupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateaddupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateaddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
