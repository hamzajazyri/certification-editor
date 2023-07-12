import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupStyleComponent, IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { EditorService } from '../../services/editor.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-editor-style-tab',
  standalone: true,
  imports: [CommonModule, FormGroupStyleComponent],
  templateUrl: './editor-style-tab.component.html',
  styleUrls: ['./editor-style-tab.component.scss']
})
export class EditorStyleTabComponent {

  formGroups: Array<IFormGroupStyle> = [];

  constructor(
    private editorSrv: EditorService
  ) {

    this.editorSrv.templateConfig$.asObservable().pipe(
      take(1)
    ).subscribe(config => {
      this.formGroups = [
        {
          groupName: 'Page Grid',
          controls: [
            {
              label: 'Width',
              type: 'number',
              value: config.grid.width,
              hint: 'The with of the page',
              name: 'grid.width',
              unit: 'px'
            }, {
              label: 'Height',
              type: 'number',
              value: config.grid.height,
              hint: 'The height of the page',
              name: 'grid.height',
              unit: 'px'
            }, {
              label: 'Columns Size',
              type: 'number',
              value: config.grid.columnsSize,
              hint: 'The height of the page',
              name: 'grid.columnsSize'
            }, {
              label: 'Rows Size',
              type: 'number',
              value: config.grid.rowsSize,
              hint: 'The height of the page',
              name: 'grid.rowsSize',
            }
          ]
        }, {
          groupName: 'Spacing',
          controls: [
            {
              label: 'Padding',
              type: 'number',
              value: config.grid.style.padding,
              name: 'grid.style.padding',
              unit: 'px'
            }
          ]
        }, {
          groupName: 'Colors',
          controls: [
            {
              label: 'Background Color',
              type: 'color',
              value: config.grid.style.bgColor,
              name: 'grid.style.bgColor',
            }
          ]
        }
      ]
    });

  }


  onControlValueChange(changes: {value: any, keyName:string}) {
    this.editorSrv.updateTemplateValue(changes.value, changes.keyName);
  }
}
