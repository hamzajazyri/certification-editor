import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStyleTabComponent } from './widget-style-tab.component';

describe('WidgetStyleTabComponent', () => {
  let component: WidgetStyleTabComponent;
  let fixture: ComponentFixture<WidgetStyleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetStyleTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetStyleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
