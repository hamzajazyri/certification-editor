import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContentComponentInterface } from '../widget.model';
import { IWidget, IWidgetSchema } from '../../editor.model';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-dynamic-table-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table-widget.component.html',
  styleUrls: ['./dynamic-table-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicTableWidgetComponent implements WidgetContentComponentInterface, OnInit {

  @Input('editable') isEditMode: boolean = false;
  @Input('variables') variables: any = {
    headers: '',
    keys: '',
    entryPoint: '',
  };

  variablesGroups: Array<IFormGroupStyle> = [
    {
      groupName: 'Dynamic Table Variables',
      controls: [
        {
          label: 'Header Names',
          name: 'variables.headers',
          type: 'string',
          value: this.variables?.headers || '',
          hint: 'Write header names sperated by comma \',\''
        },{
          label: 'Key Names',
          name: 'variables.keys',
          type: 'string',
          value: this.variables?.keys || '',
          hint: 'Write keys accordinate to header names sperated by comma \',\''
        },{
          label: 'List Entry Point',
          name: 'variables.entryPoint',
          type: 'string',
          value: this.variables?.entryPoint || '',
          hint: 'the entry point of list, where loop will be trigger'
        }
      ]
    }
  ];

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  // widget config
  schema: IWidgetSchema[] = [];
  @Input() widget!: IWidget;
  datasource: any;

  list: Array<any> = [];

  ngOnInit(): void {
    if(!this.isEditMode)
    this.list = EditorService.getObjectValueByKeyName(this.variables.entryPoint, this.datasource);
  }

  get headers(){
    if(!this.variables?.headers || !this.variables?.headers.length) {
      return [];
    }
    return (this.variables?.headers.split(',') as Array<string>).map(
      h => h.trim()
    );
  }

  get keys() {
    return (this.variables?.keys.split(',') as Array<string>).map(
      h => h.trim()
    );
  }

  getValueByKeyName(keyName: string, obj: any) {
    return EditorService.getObjectValueByKeyName(keyName, obj);
  }

}
