import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditorService } from '../../services/editor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-element',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss']
})
export class TableElementComponent {
  @Input() data!: any;

  values: Array<string> = []
  tableSize = new FormControl<string>('2x2');


  isEditMode$!: Observable<boolean>;


  constructor(
    private editorSrv: EditorService
  ) {
    this.isEditMode$ = this.editorSrv.isEditMode$;
    for(let i=1; i<20; i++) {
      for(let j=1; j<20; j++) {
        this.values.push(`${i}x${j}`)
      }
    }
  }


  get rowsCount(){
    return new Array(parseInt(this.tableSize.value!.split('x')[0]));
  }
  get colsCount(){
    return new Array(parseInt(this.tableSize.value!.split('x')[1]));
  }
}
