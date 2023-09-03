import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { ContentElementComponent } from '../content-elements/content-element.component';
import { ContentElementData, ContentElementStyle } from '../content-elements/content-element.interface';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _isEditMode$ = new BehaviorSubject<boolean>(true);
  isEditMode$: Observable<boolean>;

  private _variableGroups$ = new BehaviorSubject<Array<{ label: string; value: string }>>([]);
  variables$: Observable<Array<{ label: string; value: string }>>;

  private _components: Array<ComponentRef<ContentElementComponent>> = [];

  private _templateName$ = new BehaviorSubject<string>('');
  templateName$: Observable<string>;

  public onPaddingSetting = new EventEmitter<ComponentRef<ContentElementComponent>>();

  constructor() {
    this.isEditMode$ = this._isEditMode$.asObservable();
    this.variables$ = this._variableGroups$.asObservable();
    this.templateName$ = this._templateName$.asObservable();
  }

  setPreviewMode() { this._isEditMode$.next(false); }
  setEditMode() { this._isEditMode$.next(true); }

  updateVariablesGroups(newVariableGroups: Array<{ label: string; value: string }>) {
    this._variableGroups$.next(newVariableGroups);
  }

  addContentElement(compRef: ComponentRef<ContentElementComponent>, index: number = -1) {
    compRef.instance.onOpenPaddingSetting.subscribe(res => {
      this.onPaddingSetting.emit(compRef)
    });

    if (index === 0)
      this._components.unshift(compRef);
    else if (index != -1)
      this._components.splice(index, 0, compRef);
    else
      this._components.push(compRef);
  }

  removeContentElement(compRef: ComponentRef<ContentElementComponent>) {
    compRef.destroy();
    this._components = this._components.filter(comp => compRef != comp);
  }

  replaceTextMatch(content: string): Observable<string> {
    return this.variables$.pipe(
      switchMap(variables => {
        let ctn = content;
        for (let vari of variables) {
          ctn = ctn.replaceAll(`#{${vari.label}}`, vari.value);
        }
        return of(ctn);
      })
    )
  }

  setTemplateName(name: string) {
    this._templateName$.next(name);
  }

  saveTemplate() {
    const editorTemplate: EditorTemplate = {
      templateName: this._templateName$.getValue(),
      variables: this._variableGroups$.getValue(),
      elements: []
    };
    for (let elem of this._components) {
      editorTemplate.elements.push(elem.instance.data);
    }
    localStorage.setItem('editorTemplate', JSON.stringify(editorTemplate));
  }

  loadTemplate(): EditorTemplate | null {
    const templateJson = localStorage.getItem('editorTemplate');
    if (!templateJson) return null;
    return JSON.parse(templateJson) as EditorTemplate;
  }

}


export interface EditorTemplate {
  templateName: string;
  variables: Array<{ label: string; value: string }>;
  elements: Array<ContentElementData>
}
