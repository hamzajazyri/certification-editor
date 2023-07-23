import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { IWidget, IWidgetSchema } from '../../editor.model';
import { EditorService } from '../../services/editor.service';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetContentComponentInterface } from '../widget.model';

@Component({
  selector: 'app-table-widget',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss'],
})
export class TableWidgetComponent implements OnInit, WidgetContentComponentInterface {


  @Input('editable') isEditMode: boolean = false;
  @Input() variables: any = {
    rows: 0,
    cols: 0,
    matrix: null
  };

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  // widget config
  @Input() schema: IWidgetSchema[] = [];
  @Input() widget!: IWidget;
  datasource: any;

  variablesGroups: Array<IFormGroupStyle> = [];

  matrix: Array<Array<string>> = [[]];

  get matrixHeader() {
    return this.matrix[0];
  }
  get matrixBody(){
    return this.matrix.slice(1);
  }

  @ViewChild('tableRef') tableRef!: ElementRef<HTMLTableElement>;

  ngOnInit(): void {
    this.variablesGroups = [
      {
        groupName: 'Table Variables',
        controls: [
          {
            label: 'Rows Count',
            type: 'number',
            name: 'variables.rows',
            value: this.variables?.rows || 0
          }, {
            label: 'Columns Count',
            type: 'number',
            name: 'variables.cols',
            value: this.variables?.cols || 0
          }
        ]
      }
    ];

    if(this.isEditMode) {
      this.generateMatrix();
      this.variables.matrix = this.matrix;
      return;
    }
    this.matrix = (this.variables.matrix as Array<Array<string>>).map( line => line.map( col => this.replaceTextMatch(this.schema,col) ));

  }


  debounceTimeout: any;
  onContentChange(row: number, col:number, event:Event) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.debounceTimeout = null;
      this.variables.matrix[row][col] = (event.target as HTMLElement).innerText;
    }, 1000); //

  }

  replaceTextMatch(schema: Array<IWidgetSchema>, editorContent: string): string {
    for (let schem of schema) {
      editorContent = editorContent.replaceAll(`#{${schem.textMatch}}`, EditorService.getObjectValueByKeyName(schem.mapTo, this.datasource));
    }
    return editorContent;
  }


  generateMatrix() {
    const addToArr = new Array(parseInt(this.variables.rows)).fill(0).map(
      (_, index) => this.generateColumnsArray(parseInt(this.variables.cols))
    );

    this.matrix = addToArr;
  }

  // handle Matrix data columns,
  generateColumnsArray(length: number, arr: Array<string> | null = null): Array<string> {
    return new Array(length).fill(0).map((_, index) => index.toString());
  }


}
