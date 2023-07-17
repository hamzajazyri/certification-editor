import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContentComponentInterface } from '../widget.model';
import { IWidgetSchema } from '../../editor.model';

@Component({
  selector: 'app-dynamic-table-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table-widget.component.html',
  styleUrls: ['./dynamic-table-widget.component.scss']
})
export class DynamicTableWidgetComponent implements WidgetContentComponentInterface {

  @Input('editable') isEditMode: boolean = false;

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  // widget config
  schema: IWidgetSchema[] = [];
  datasource: any;
}
