import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _isEditMode$ = new BehaviorSubject<boolean>(true);
  isEditMode$: Observable<boolean>;

  constructor() {
    this.isEditMode$ = this._isEditMode$.asObservable()
  }


  setPreviewMode(){
    this._isEditMode$.next(false);
  }
  setEditMode() {
    this._isEditMode$.next(true);
  }
}
