import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JEditorComponent } from './j-editor.component';

describe('JEditorComponent', () => {
  let component: JEditorComponent;
  let fixture: ComponentFixture<JEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
