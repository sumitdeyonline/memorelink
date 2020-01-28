import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostjobvendorComponent } from './postjobvendor.component';

describe('PostjobvendorComponent', () => {
  let component: PostjobvendorComponent;
  let fixture: ComponentFixture<PostjobvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostjobvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostjobvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
