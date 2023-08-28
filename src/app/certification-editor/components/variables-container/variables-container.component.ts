import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JCollapseComponent } from '../j-collapse/j-collapse.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorService } from '../../services/editor.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-variables-container',
  standalone: true,
  imports: [CommonModule, JCollapseComponent, ReactiveFormsModule],
  templateUrl: './variables-container.component.html',
  styleUrls: ['./variables-container.component.scss']
})
export class VariablesContainerComponent {

  schemaFrom = new FormGroup({
    groups: new FormArray<any>([])
  });

  get formGroups(): FormArray {
    return this.schemaFrom.get('groups') as FormArray;
  }

  constructor(
    private editorSrv: EditorService
  ) {
    this.schemaFrom.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe( _ => {
      this.editorSrv.updateVariablesGroups(this.formGroups.value)
    });
  }

  addSchemaVariable(label: string, value: string) {
    const schemaFormGroup = new FormGroup({
      label: new FormControl(label),
      value: new FormControl(value)
    });
    this.schemaFrom.controls.groups.push(schemaFormGroup);
  }

  removeSchemaVariable(index: number) {
    this.formGroups.removeAt(index);
  }

}
