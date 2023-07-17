import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupStyleComponent, IFormGroupStyle } from '../../shared/form-group-style/form-group-style.component';
import { EditorService } from '../../services/editor.service';
import { take } from 'rxjs';
import { IWidget } from '../../editor.model';

@Component({
  selector: 'app-editor-style-tab',
  standalone: true,
  imports: [CommonModule, FormGroupStyleComponent],
  templateUrl: './editor-style-tab.component.html',
  styleUrls: ['./editor-style-tab.component.scss']
})
export class EditorStyleTabComponent {

  formGroups: Array<IFormGroupStyle> = [];
  @Input() widget!: IWidget;

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
              name: 'grid.width',
              unit: 'px'
            }, {
              label: 'Height',
              type: 'number',
              value: config.grid.height,
              name: 'grid.height',
              unit: 'px'
            }, {
              label: 'Columns Size',
              type: 'number',
              value: config.grid.columnsSize,
              hint: 'Update grid size before adding widgets!!',
              name: 'grid.columnsSize'
            }, {
              label: 'Rows Size',
              type: 'number',
              value: config.grid.rowsSize,
              hint: 'Update grid size before adding widgets!!',
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
              value: config.grid.style.backgroundColor,
              name: 'grid.style.backgroundColor',
            }
          ]
        }
      ]
    });

  }


  onControlValueChange(changes: {value: any, keyName:string}) {
    // EditorService.updateObjectValueByKeyName(changes.value, changes.keyName, this.widget);
    this.editorSrv.updateTemplateValue(changes.value, changes.keyName);
    this.editorSrv.log();
  }
}
