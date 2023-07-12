import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStyleComponent } from './control-style.component';

describe('ControlStyleComponent', () => {
  let component: ControlStyleComponent;
  let fixture: ComponentFixture<ControlStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ControlStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
