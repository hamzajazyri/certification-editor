import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlStyleComponent } from '../control-style/control-style.component';

@Component({
  selector: 'app-form-group-style',
  standalone: true,
  imports: [CommonModule, ControlStyleComponent],
  templateUrl: './form-group-style.component.html',
  styleUrls: ['./form-group-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormGroupStyleComponent {

  @Input() groupName!: string;
  @Input() controls!: Array<IFormControlStyle>;

  @Output() onControlChange = new EventEmitter<{value: any, keyName: string}>();

  onControlChangeHandler(value: any, keyName: string) {
    this.onControlChange.emit({value, keyName});
  }

}

export interface IFormGroupStyle {
  groupName: string;
  controls: Array<IFormControlStyle>
}

export interface IFormControlStyle {
  label: string;
  value: number | string; // default value
  type: 'list' | 'number' | 'string' | 'color';
  suggestions?: Array<number|string>; // only used when type is list
  hint?: string;
  name: string;
  unit?: string;
}
