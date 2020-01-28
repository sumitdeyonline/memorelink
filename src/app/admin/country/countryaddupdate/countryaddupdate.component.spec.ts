import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryaddupdateComponent } from './countryaddupdate.component';

describe('CountryaddupdateComponent', () => {
  let component: CountryaddupdateComponent;
  let fixture: ComponentFixture<CountryaddupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryaddupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryaddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
