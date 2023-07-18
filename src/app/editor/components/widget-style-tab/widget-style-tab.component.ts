import { Component, Input, OnInit } from '@angular/core';
import { FormGroupStyleComponent, IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IWidget } from '../../editor.model';
import { EditorService } from '../../services/editor.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-widget-style-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormGroupStyleComponent],
  templateUrl: './widget-style-tab.component.html',
  styleUrls: ['./widget-style-tab.component.scss']
})
export class WidgetStyleTabComponent implements OnInit {


  @Input() widget!: IWidget;


  formStyleGroups: Array<IFormGroupStyle> = [];

  schemaFrom = new FormGroup({
    groups: new FormArray<any>([])
  });

  get formGroups(): FormArray {
    return this.schemaFrom.get('groups') as FormArray;
  }

  constructor(
    private editorSrv: EditorService,
  ) { }

  ngOnInit(): void {
    this.formStyleGroups = getFormStyleGroupsConfig(this.widget)
  }

  onControlValueChange(changes: { value: any, keyName: string }) {
    console.log("this.widget");
    console.log(this.widget);
    this.editorSrv.updateWidget(changes.value, changes.keyName, this.widget);
    // EditorService.updateObjectValueByKeyName(changes.value, changes.keyName, this.widget);

    // this.editorSrv.emitNewValue();
    this.editorSrv.log();
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




export const getFormStyleGroupsConfig = (widget: IWidget) : Array<IFormGroupStyle> => {
  return [
    {
      groupName: 'Border',
      controls: [
        {
          label: 'Width',
          type: 'number',
          value: widget.style.borderWidth,
          name: 'style.borderWidth',
          unit: 'px'
        }, {
          label: 'Style',
          type: 'list',
          suggestions: ['solid', 'dashed'],
          value: widget.style.borderStyle,
          name: 'style.borderStyle',
        }, {
          label: 'Color',
          type: 'color',
          value: widget.style.borderColor,
          name: 'style.borderColor'
        }, {
          label: 'Radius',
          type: 'number',
          value: widget.style.borderRadius,
          name: 'style.borderRadius',
          unit: 'px'
        }
      ]
    }, {
      groupName: 'Align',
      controls: [
        {
          label: 'Vertical',
          type: 'list',
          suggestions: ['left', 'right', 'center'],
          value: widget.style.verticalAlign,
          name: 'style.verticalAlign'
        }, {
          label: 'Horizantal',
          type: 'list',
          suggestions: ['top', 'center', 'bottom'],
          value: widget.style.horizantalAlign,
          name: 'style.horizantalAlign'
        }
      ]
    }, {
      groupName: 'Colors',
      controls: [
        {
          label: 'Background Color',
          type: 'color',
          value: widget.style.backgroundColor,
          name: 'style.backgroundColor',
        }
      ]
    }, {
      groupName: 'Spacing',
      controls: [
        {
          label: 'padding',
          type: 'number',
          value: widget.style.padding,
          name: 'style.padding',
          unit: 'px'
        }
      ]
    }
  ];
};
