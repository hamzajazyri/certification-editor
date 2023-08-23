import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paragraph-element',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './paragraph-element.component.html',
  styleUrls: ['./paragraph-element.component.scss']
})
export class ParagraphElementComponent implements OnInit {
  @Input() data: any;

  editor!: Editor;
  editorContent = new FormControl({ value: '<p>lorem mzejslqdkdfjdqsf j</p>', disabled: false });
  toolbar = toolbarEditorDefaultConfig;

  ngOnInit(): void {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
  }

}

// colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

export const toolbarEditorDefaultConfig: Toolbar = [
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'ordered_list', 'bullet_list', 'text_color', 'background_color'],
  // [],
  // ['code', ],
  // [],
  // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  // ['link', 'image'],
  // [],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ['horizontal_rule', 'format_clear']
];
