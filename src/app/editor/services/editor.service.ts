import { Injectable } from '@angular/core';
import { IEditor } from '../editor.model';
import { BehaviorSubject } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  templateConfig$: BehaviorSubject<IEditor> = new BehaviorSubject(defaultTemplateConfig);

  constructor() { }

  saveTemplate(){}
  loadTemplate(){}

  updateTemplateValue(value: any, keyName: string){
    const deep = keyName.split('.');
    let templateNewVal = {...this.templateConfig$.getValue()};
    let keyRef: any = templateNewVal;

    for(let depth of deep.slice(0,-1))
      keyRef = keyRef[depth as keyof IEditor];

    keyRef[deep[deep.length-1]] = typeof(keyRef[deep[deep.length-1]]) === 'number' ? parseInt(value) : value;
    this.templateConfig$.next(templateNewVal);
  }


  // add item to the grid
  pushWidget(component: string, item: GridsterItem){
    const nextTempalteConfigValue = this.templateConfig$.getValue();
    nextTempalteConfigValue.widgets.push({
      datasource: {},
      gridConfig: {...item, cols:2, rows:2},
      schema: [],
      style: {
        borderWidth: 0,
        borderColor: 'red',
        borderStyle: 'solid',
        borderRadius: 0,
        verticalAlign: 'left',
        horizantalAlign: 'top',
        padding: 0,
        backgroundColor: '#ffffff'
      },
      widgetType: 'TextEditor'
    });
    this.templateConfig$.next(nextTempalteConfigValue)
  }

}



export const defaultTemplateConfig: IEditor = {
  grid: {
    columnsSize: 12,
    rowsSize: 24,
    width: 854,
    height: 1054,
    style: {
      backgroundColor: '#ffffff',
      padding: 0
    }
  },
  widgets: [],
  datasource: {}
}


export const gridsterItemConfig: GridsterItem = {
  cols: 4, // Width of the item in grid columns (should be within the maximum allowed)
  rows: 4, // Height of the item in grid rows (should be within the maximum allowed)
  x: 0, // X position of the item in the grid
  y: 0, // Y position of the item in the grid
  dragEnabled: true, // Allow item to be dragged
  resizeEnabled: true, // Allow item to be resized
  headerClicked: true, // Add a new property to track if the header has been clicked*
  // clone: true,
};
