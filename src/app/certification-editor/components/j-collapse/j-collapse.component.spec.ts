import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JCollapseComponent } from './j-collapse.component';

describe('JCollapseComponent', () => {
  let component: JCollapseComponent;
  let fixture: ComponentFixture<JCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JCollapseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
