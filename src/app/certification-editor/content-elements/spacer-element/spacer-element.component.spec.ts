import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacerElementComponent } from './spacer-element.component';

describe('SpacerElementComponent', () => {
  let component: SpacerElementComponent;
  let fixture: ComponentFixture<SpacerElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpacerElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
