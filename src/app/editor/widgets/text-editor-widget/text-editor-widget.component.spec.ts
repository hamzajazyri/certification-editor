import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorWidgetComponent } from './text-editor-widget.component';

describe('TextEditorWidgetComponent', () => {
  let component: TextEditorWidgetComponent;
  let fixture: ComponentFixture<TextEditorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TextEditorWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
