import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableWidgetComponent } from './dynamic-table-widget.component';

describe('DynamicTableWidgetComponent', () => {
  let component: DynamicTableWidgetComponent;
  let fixture: ComponentFixture<DynamicTableWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicTableWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
