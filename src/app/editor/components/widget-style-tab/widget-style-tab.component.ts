import { Component, Input, OnInit } from '@angular/core';
import { IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-style-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './widget-style-tab.component.html',
  styleUrls: ['./widget-style-tab.component.scss']
})
export class WidgetStyleTabComponent implements OnInit{


  @Input() formGroups: Array<IFormGroupStyle> = [];

  schemaFromArray = new FormArray([]);


  schemaFormGroup = new FormGroup({
    textMatch: new FormControl(''),
    mapTo: new FormControl('')
  });

  ngOnInit(): void {

  }
}
