import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableElementsTabComponent } from './draggable-elements-tab.component';

describe('DraggableElementsTabComponent', () => {
  let component: DraggableElementsTabComponent;
  let fixture: ComponentFixture<DraggableElementsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableElementsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableElementsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
