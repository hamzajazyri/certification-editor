import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterCardsComponent } from './gridster-cards.component';

describe('GridsterCardsComponent', () => {
  let component: GridsterCardsComponent;
  let fixture: ComponentFixture<GridsterCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GridsterCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridsterCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
