import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrydialogComponent } from './countrydialog.component';

describe('CountrydialogComponent', () => {
  let component: CountrydialogComponent;
  let fixture: ComponentFixture<CountrydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
