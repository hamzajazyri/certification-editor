import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-heading-element',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './heading-element.component.html',
  styleUrls: ['./heading-element.component.scss']
})
export class HeadingElementComponent {

  @Input() data: any;

  editor!: Editor;
  editorContent = new FormControl({ value: '<h1>HEADING TEXT</h1>', disabled: false });
  toolbar = headingToolbarEditorDefaultConfig;

  isEditMode$!: Observable<boolean>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.isEditMode$ = this.editorSrv.isEditMode$;
    this.isEditMode$.subscribe( res => {
      if(res)
        this.editorContent.enable();
      else
        this.editorContent.disable();
    })
  }


  ngOnInit(): void {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
  }


}

export const headingToolbarEditorDefaultConfig: Toolbar = [
  ['italic', 'underline',  'text_color'],
  // [],
  // ['code', ],
  // [],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  // ['link', 'image'],
  // [],
  ['align_left', 'align_center', 'align_right'],
  // ['horizontal_rule', 'format_clear']
];
