import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbulkprofileComponent } from './uploadbulkprofile.component';

describe('UploadbulkprofileComponent', () => {
  let component: UploadbulkprofileComponent;
  let fixture: ComponentFixture<UploadbulkprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadbulkprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadbulkprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
