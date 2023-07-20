import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IWidgetSchema } from '../../editor.model';
import { WidgetContentComponentInterface } from '../widget.model';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { debounceTime } from 'rxjs';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-text-editor-widget',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './text-editor-widget.component.html',
  styleUrls: ['./text-editor-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextEditorWidgetComponent implements WidgetContentComponentInterface, OnInit {

  @Input('editable') isEditMode: boolean = false;
  @Input() variables : any = {
    editorContent: ''
  };

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  editor!: Editor;
  editorContent = new FormControl({ value: '', disabled: false });

  // widget config
  @Input() schema: IWidgetSchema[] = [];
  datasource: any;

  variablesGroups: Array<IFormGroupStyle> = [];

  ngOnInit() {
    this.editor = new Editor({ inputRules: true });
    if(Object.keys(this.variables).includes('editorContent'))
      this.editorContent.patchValue(this.variables['editorContent']);
    if(!this.isEditMode){
      this.editorContent.disable();
      this.editorContent.patchValue(this.replaceTextMatch(this.schema, this.variables['editorContent']));
    }

    this.editorContent.valueChanges.pipe(
      debounceTime(100)
    ).subscribe( content => this.variables.editorContent = content);
  }

  focusInEventHandler() {
    this.onEventTrigger.emit({eventName: 'EDITOR_FOCUS_IN', eventValue: this.editor});
  }

  replaceTextMatch(schema: Array<IWidgetSchema>, editorContent: string): string{
    for( let schem of schema) {
      editorContent = editorContent.replaceAll(`#{${schem.textMatch}}`, EditorService.getObjectValueByKeyName(schem.mapTo, this.datasource));
    }
    return editorContent;
  }
}
