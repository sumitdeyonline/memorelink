import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListjobComponent } from './listjob.component';

describe('ListjobComponent', () => {
  let component: ListjobComponent;
  let fixture: ComponentFixture<ListjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
