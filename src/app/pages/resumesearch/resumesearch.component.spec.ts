import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesearchComponent } from './resumesearch.component';

describe('ResumesearchComponent', () => {
  let component: ResumesearchComponent;
  let fixture: ComponentFixture<ResumesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
