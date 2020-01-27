import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleimageComponent } from './middleimage.component';

describe('MiddleimageComponent', () => {
  let component: MiddleimageComponent;
  let fixture: ComponentFixture<MiddleimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
