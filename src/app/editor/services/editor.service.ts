import { Injectable } from '@angular/core';
import { IEditor } from '../editor.model';
import { BehaviorSubject } from 'rxjs';

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

}



export const defaultTemplateConfig: IEditor = {
  grid: {
    columnsSize: 12,
    rowsSize: 24,
    width: 854,
    height: 1054,
    style: {
      bgColor: '#ffffff',
      padding: 0
    }
  },
  widgets: [],
  datasource: {}
}
