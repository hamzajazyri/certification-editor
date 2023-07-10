import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMAGE_DOC, TEXT_DOC } from './jsonDoc';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit {

  @Output() onEditorEdit = new EventEmitter<Editor>();

  editor: Editor;

  form = new FormGroup({
    content: new FormControl({value: TEXT_DOC, disabled: false})
  });


  constructor() {
    this.editor = new Editor({inputRules: true});
  }

  ngOnInit(): void {
    this.form.get('content')?.valueChanges.subscribe( res => {
      console.log(res);
    });
  }

  get doc(): AbstractControl {
    return this.form.get('content')!;
  }

  edit(event: MouseEvent){
    console.log("works")
    this.onEditorEdit.emit(this.editor);
    event.stopPropagation();
    event.preventDefault();
  }
}
