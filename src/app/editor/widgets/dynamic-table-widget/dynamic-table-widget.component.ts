import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContentComponentInterface } from '../widget.model';
import { IWidgetSchema } from '../../editor.model';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';

@Component({
  selector: 'app-dynamic-table-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table-widget.component.html',
  styleUrls: ['./dynamic-table-widget.component.scss']
})
export class DynamicTableWidgetComponent implements WidgetContentComponentInterface {

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
  datasource: any;


  get headers(){
    if(!this.variables?.headers || !this.variables?.headers.length) {
      return [];
    }
    return (this.variables?.headers.split(',') as Array<string>).map(
      h => h.trim()
    );
  }


}
