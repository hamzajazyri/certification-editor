import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesContainerComponent } from './variables-container.component';

describe('VariablesContainerComponent', () => {
  let component: VariablesContainerComponent;
  let fixture: ComponentFixture<VariablesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VariablesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
