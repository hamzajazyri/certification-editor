import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  HEADING_DOC, TEXT_DOC } from './jsonDoc';
import { GridsterItem } from 'angular-gridster2';
import { WidgetInterface } from '../widget.interface';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { WidgetConfig, WidgetModalInterface } from '../widget/widget.component';


// TO-DO
// widgetconfig is used twise -> should have it's own comp..

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="widget-modal">
      <h2>Widget config:</h2>
      <form [formGroup]="widgetForm">
          <div>
            <label>Padding</label>
            <input type="number" formControlName="padding"/>
          </div>
          <div>
            <label>margin</label>
            <input type="number" formControlName="margin"/>
          </div>
          <div>
            <label>bgColor</label>
            <input type="color" formControlName="bgColor"/>
          </div>
      </form>

      <div>
        <button (click)="valuesChange()">Done</button>
      </div>
    </div>
  `,
  styles: [
    `form > div, form label {
      margin:7px;
    }`
  ]
})
export class TextWidgetModalComponent implements WidgetModalInterface{

  @Output() onValuesChange = new EventEmitter<{widgetConfig: WidgetConfig, data: any}>();

  widgetForm = new FormGroup({
    padding: new FormControl<number>(0),
    margin: new FormControl<number>(0),
    bgColor: new FormControl<string>('#fff'),
  });

  data = {};

  valuesChange(){
    this.onValuesChange.emit({widgetConfig: this.widgetForm.value as WidgetConfig, data: this.data});
  }


}




@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule, DialogModule],
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent implements OnInit, WidgetInterface {

  @Output() onEditorEdit = new EventEmitter<Editor>();
  @Output() onEditorEditEnd = new EventEmitter<void>();

  gridsterItem!: GridsterItem;
  @Input() widgetConfig: WidgetConfig = {
    bgColor: 'white',
    margin: 0,
    padding: 0
  };

  @Input() isHeading = false;
  @Input() isParagraph = false;

  setData(data:any){
    this.data = {...this.data, ...data};
  }
  data: any = {};

  editor: Editor;
  isEditMode = false;

  form = new FormGroup({
    content: new FormControl({ value: this.data?.type ==='heading' ? HEADING_DOC : TEXT_DOC, disabled: false })
  });


  constructor(private dialog: Dialog) {
    this.editor = new Editor({ inputRules: true });
  }

  ngOnInit(): void {
    this.form.get('content')?.valueChanges.subscribe(res => {
      console.log(res);
    });
    this.form.setControl('content', new FormControl({ value: this.data?.type ==='heading' ? HEADING_DOC : TEXT_DOC, disabled: false }));
  }

  get doc(): AbstractControl {
    return this.form.get('content')!;
  }

  edit(event: MouseEvent) {
    this.isEditMode = true;
    console.log("works")
    this.onEditorEdit.emit(this.editor);
    event.stopPropagation();
    event.preventDefault();
  }

  done(event: MouseEvent) {
    this.isEditMode = false;
    this.onEditorEditEnd.emit();
    event.stopPropagation();
    event.preventDefault();
  }

  openModal<T extends WidgetModalInterface>() : DialogRef<T> {
    return this.dialog.open<T>(TextWidgetModalComponent, { height: '100%', width: '400px'});
  }
}
