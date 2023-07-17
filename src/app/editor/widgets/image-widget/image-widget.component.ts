import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContentComponentInterface } from '../widget.model';
import { IWidgetSchema } from '../../editor.model';

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageWidgetComponent implements WidgetContentComponentInterface{

  @Input('editable') isEditMode: boolean = false;

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();


    // widget config
    schema: IWidgetSchema[] = [];
    datasource: any;
}
