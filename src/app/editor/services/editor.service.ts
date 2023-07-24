import { Injectable } from '@angular/core';
import { IEditor, IWidget, IWidgetSchema } from '../editor.model';
import { BehaviorSubject } from 'rxjs';
import { GridsterItem } from 'angular-gridster2';
import { ComponentMap } from '../widgets/widget.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  templateConfig$: BehaviorSubject<IEditor> = new BehaviorSubject(defaultTemplateConfig);

  constructor() { }

  saveTemplate() {
    localStorage.setItem('template', JSON.stringify(this.templateConfig$.getValue()));
  }

  loadTemplate() {
    const tempStr = localStorage.getItem('template');
    if(tempStr === null){
      alert("Template is missing");
      return;
    }
    const template = JSON.parse(tempStr!) as IEditor;
    this.templateConfig$.next(template);
  }

  updateTemplateValue(value: any, keyName: string) {
    const obj = this.templateConfig$.getValue();
    this.templateConfig$.next(
      EditorService.updateObjectValueByKeyName(value, keyName, obj)
    );
  }

  updateWidget(value: any, keyName: string, widget: IWidget) {
    let copy = { ...this.templateConfig$.getValue() };
    let findIndex = copy.widgets.findIndex(w => w === widget);
    copy.widgets[findIndex] = EditorService.updateObjectValueByKeyName(value, keyName, copy.widgets[findIndex]);
    this.emitNewValue(copy);
    return copy.widgets[findIndex];
  }

  udpateWigetContent(value: any, keyName: string, widget: IWidget) {
    let copy = { ...this.templateConfig$.getValue() };
    let findIndex = copy.widgets.findIndex(w => w === widget);
    copy.widgets[findIndex] = EditorService.updateObjectValueByKeyName(value, keyName, copy.widgets[findIndex]);
  }

  updateSchema(schema: Array<IWidgetSchema>){
    let copy = { ...this.templateConfig$.getValue() };
    copy.schema = schema;
    this.emitNewValue(copy);
  }

  emitNewValue(newValue: IEditor | null = null) {
    if (newValue) {
      this.templateConfig$.next(newValue);
      return;
    }
    let newVal = { ...this.templateConfig$.getValue() };
    for (let i = 0; i < newVal.widgets.length; i++) {
      var newWidget: IWidget = {...newVal.widgets[i]};
      for(let key of Object.keys(newVal.widgets[i])) {
        newWidget[key as keyof IWidget] = {...newVal.widgets[i][key as keyof IWidget]};
      }
      newVal.widgets[i] = newWidget;
    }
    this.templateConfig$.next(newVal);
  }

  static updateObjectValueByKeyName(value: any, keyName: string, obj: any) {
    const deep = keyName.split('.');
    let templateNewVal = { ...obj };
    let keyRef: any = templateNewVal;
    for (let depth of deep.slice(0, -1))
      keyRef = keyRef[depth as keyof IEditor];

    //
    keyRef[deep[deep.length - 1]] = ((keyRef[deep[deep.length - 1]]) && typeof (keyRef[deep[deep.length - 1]]) === 'number') ? parseInt(value) : value;
    return templateNewVal;
  }

  static getObjectValueByKeyName(keyName: string, obj: any){
    const deep = keyName.split('.');
    let val = obj;
    for(let depth of deep.slice(0, -1))
      val = val[depth];
    return val[deep[deep.length-1]];
  }

  // add item to the grid
  pushWidget(component: keyof typeof ComponentMap, item: GridsterItem) {
    const nextTempalteConfigValue = this.templateConfig$.getValue();
    nextTempalteConfigValue.widgets.push({
      gridConfig: { ...item, cols: 2, rows: 2 },
      variables: {},
      style: {
        borderWidth: 0,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderRadius: 0,
        verticalAlign: 'left',
        horizantalAlign: 'top',
        padding: 0,
        backgroundColor: '#ffffff'
      },
      widgetType: component
    });
    this.templateConfig$.next(nextTempalteConfigValue);
  }

  removeWidget(widget: IWidget) {
    let copy = { ...this.templateConfig$.getValue() };
    const findIndex = this.templateConfig$.getValue().widgets.findIndex(w => w === widget);
    copy.widgets.splice(findIndex, 1);
    this.emitNewValue(copy);
  }

  log() {
    console.log(this.templateConfig$.getValue())
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
  schema: [],
  widgets: []
}

export const defaultWidgetConfig: any = { // IWidget
  gridConfig: { x: 0, y: 0, cols: 2, rows: 2 },
  schema: [],
  style: {
    borderWidth: 0,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 0,
    verticalAlign: 'left',
    horizantalAlign: 'top',
    padding: 0,
    backgroundColor: '#ffffff'
  }
};

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
