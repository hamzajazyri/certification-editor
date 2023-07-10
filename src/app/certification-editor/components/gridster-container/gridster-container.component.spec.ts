import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterContainerComponent } from './gridster-container.component';

describe('GridsterContainerComponent', () => {
  let component: GridsterContainerComponent;
  let fixture: ComponentFixture<GridsterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GridsterContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridsterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
