import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadresumeComponent } from './uploadresume.component';

describe('UploadresumeComponent', () => {
  let component: UploadresumeComponent;
  let fixture: ComponentFixture<UploadresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
