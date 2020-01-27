import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechNewsDetailsComponent } from './tech-news-details.component';

describe('TechNewsDetailsComponent', () => {
  let component: TechNewsDetailsComponent;
  let fixture: ComponentFixture<TechNewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechNewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
