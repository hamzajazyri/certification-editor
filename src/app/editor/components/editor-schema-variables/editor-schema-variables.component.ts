import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
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
    this.schemaFrom.valueChanges.pipe(
      debounceTime(100)
    ).subscribe( res => {
      this.onSchemaFormChange();
    })
  }

  onSchemaFormChange() {
    console.log(this.formGroups.value)
    this.editorSrv.updateSchema(this.formGroups.value);
  }

  addSchemaVariable() {
    const schemaFormGroup = new FormGroup({
      textMatch: new FormControl(''),
      mapTo: new FormControl('')
    });
    this.schemaFrom.controls.groups.push(schemaFormGroup);
  }

  removeSchemaVariable(index: number) {
    this.formGroups.removeAt(index);
  }
}
