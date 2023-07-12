import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorStyleTabComponent } from './editor-style-tab.component';

describe('EditorStyleTabComponent', () => {
  let component: EditorStyleTabComponent;
  let fixture: ComponentFixture<EditorStyleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EditorStyleTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorStyleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
