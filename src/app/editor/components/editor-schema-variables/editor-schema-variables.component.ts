import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, take } from 'rxjs';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-editor-schema-variables',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editor-schema-variables.component.html',
  styleUrls: ['./editor-schema-variables.component.scss']
})
export class EditorSchemaVariablesComponent implements OnInit {

  schemaFrom = new FormGroup({
    groups: new FormArray<any>([])
  });

  get formGroups(): FormArray {
    return this.schemaFrom.get('groups') as FormArray;
  }

  constructor(
    private editorSrv: EditorService
  ) {}

  ngOnInit(): void {
    this.editorSrv.templateConfig$.pipe(
      take(1)
    ).subscribe( res => {
      for(let sche of res.schema) {
        this.addSchemaVariable(sche.textMatch, sche.mapTo);
      }
    });
    this.schemaFrom.valueChanges.pipe(
      debounceTime(100)
    ).subscribe( res => {
      this.onSchemaFormChange();
    });
  }

  onSchemaFormChange() {
    this.editorSrv.updateSchema(this.formGroups.value);
  }

  addSchemaVariable(textMatch: string, mapTo: string) {
    const schemaFormGroup = new FormGroup({
      textMatch: new FormControl(textMatch),
      mapTo: new FormControl(mapTo)
    });
    this.schemaFrom.controls.groups.push(schemaFormGroup);
  }

  removeSchemaVariable(index: number) {
    this.formGroups.removeAt(index);
  }
}
