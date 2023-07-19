import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IWidgetSchema } from '../../editor.model';
import { WidgetContentComponentInterface } from '../widget.model';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';

@Component({
  selector: 'app-text-editor-widget',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './text-editor-widget.component.html',
  styleUrls: ['./text-editor-widget.component.scss']
})
export class TextEditorWidgetComponent implements WidgetContentComponentInterface, OnInit {

  @Input('editable') isEditMode: boolean = false;
  @Input() variables : any;

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  editor!: Editor;
  editorContent = new FormControl({ value: '', disabled: false });

  // widget config
  schema: IWidgetSchema[] = [];
  datasource: any;

  variablesGroups: Array<IFormGroupStyle> = [];

  ngOnInit() {
    this.editor = new Editor({ inputRules: true });
    if(Object.keys(this.variables).includes('editorContent'))
      this.editorContent.patchValue(this.variables['editorContent']);
    if(!this.isEditMode)
      this.editorContent.disable();
  }

  focusInEventHandler() {
    this.onEventTrigger.emit({eventName: 'EDITOR_FOCUS_IN', eventValue: this.editor});
  }
}
