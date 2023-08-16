import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingElementComponent } from './heading-element.component';

describe('HeadingElementComponent', () => {
  let component: HeadingElementComponent;
  let fixture: ComponentFixture<HeadingElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeadingElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
