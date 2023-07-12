import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupStyleComponent } from './form-group-style.component';

describe('FormGroupStyleComponent', () => {
  let component: FormGroupStyleComponent;
  let fixture: ComponentFixture<FormGroupStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormGroupStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
