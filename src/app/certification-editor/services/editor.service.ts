import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentElementComponent } from '../content-elements/content-element.component';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _isEditMode$ = new BehaviorSubject<boolean>(true);
  isEditMode$: Observable<boolean>;

  private _variableGroups$ = new BehaviorSubject<Array<{ label: string; value: string }>>([]);
  variables$: Observable<Array<{ label: string; value: string }>>;

  private _components: Array<ComponentRef<ContentElementComponent>>= [];

  constructor() {
    this.isEditMode$ = this._isEditMode$.asObservable();
    this.variables$ = this._variableGroups$.asObservable();
  }

  setPreviewMode() { this._isEditMode$.next(false); }
  setEditMode() { this._isEditMode$.next(true); }

  updateVariablesGroups(newVariableGroups: Array<{ label: string; value: string }>) {
    this._variableGroups$.next(newVariableGroups);
  }

  addContentElement(compRef: ComponentRef<ContentElementComponent>) {
    this._components.push(compRef);
  }

  removeContentElement(compRef: ComponentRef<ContentElementComponent>) {
    compRef.destroy();
    this._components = this._components.filter( comp => compRef != comp);
  }


}
