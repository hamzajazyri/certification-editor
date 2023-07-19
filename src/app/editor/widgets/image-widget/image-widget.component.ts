import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetContentComponentInterface } from '../widget.model';
import { IWidgetSchema } from '../../editor.model';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageWidgetComponent implements WidgetContentComponentInterface {

  @Input('editable') isEditMode: boolean = false;
  @Input('variables') variables: any = {
    imgLink: ''
  };

  variablesGroups: Array<IFormGroupStyle> = [
    {
      groupName: 'Custom Variables',
      controls: [
        {
          label: 'Image Link',
          type: 'string',
          name: 'variables.imgLink',
          value: this.variables?.imgLink || 'https://placehold.co/600x400'
        }
      ]
    }
  ];

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();


  // widget config
  schema: IWidgetSchema[] = [];
  datasource: any;


}
