import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetInterface } from '../widget.interface';
import { GridsterItem } from 'angular-gridster2';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WidgetConfig, WidgetModalInterface } from '../widget/widget.component';
import { Editor } from 'ngx-editor';


@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="widget-modal">
      <form [formGroup]="widgetForm">
          <h2>Widget config:</h2>
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
      <form [formGroup]="dataForm">
        <h2>Widget data:</h2>
        <div>
          <label>Image link</label>
          <input type="text" formControlName="src"/>
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
export class ImageWidgetModalComponent implements WidgetModalInterface, OnInit {


  @Output() onValuesChange = new EventEmitter<{ widgetConfig: WidgetConfig, data: any }>();

  widgetForm = new FormGroup({
    padding: new FormControl<number>(0),
    margin: new FormControl<number>(0),
    bgColor: new FormControl<string>('#fff'),
  });

  dataForm = new FormGroup({
    src: new FormControl<string | null>(null)
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<ImageWidgetModalComponent>) {
    // this.widgetForm.patchValue(this.data.widgetConfig);
    if (this.dialogRef)
      this.dialogRef.updatePosition({ top: '25px', left: '25px' })

  }

  ngOnInit(): void {
    // console.log(this.data)
    // this.widgetForm.patchValue(this.data.widgetConfig);

  }

  valuesChange() {
    this.onValuesChange.emit({ widgetConfig: this.widgetForm.value as WidgetConfig, data: this.dataForm.value });
  }
}



@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent implements WidgetInterface, OnChanges {

  // not used in IMageWidget
  @Output() onEditorEdit = new EventEmitter<Editor>();
  @Output() onEditorEditEnd = new EventEmitter<void>();


  @Input() widgetConfig: WidgetConfig = {
    bgColor: 'white',
    margin: 0,
    padding: 0
  };
  gridsterItem!: GridsterItem;



  data: any = {
    src: null
  };

  constructor(private dialog: Dialog) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  setData(data:any){
    this.data = {...this.data, ...data};
  }


  openModal<T extends WidgetModalInterface>(): DialogRef<T> {
    return this.dialog.open<T>(ImageWidgetModalComponent, { height: '100%', width: '400px', data: { widgetConfig: this.widgetConfig } });
  }

}


