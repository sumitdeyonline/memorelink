import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyjobAdminComponent } from './applyjob-admin.component';

describe('ApplyjobAdminComponent', () => {
  let component: ApplyjobAdminComponent;
  let fixture: ComponentFixture<ApplyjobAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyjobAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyjobAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
