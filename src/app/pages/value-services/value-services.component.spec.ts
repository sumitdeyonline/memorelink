import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueServicesComponent } from './value-services.component';

describe('ValueServicesComponent', () => {
  let component: ValueServicesComponent;
  let fixture: ComponentFixture<ValueServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
