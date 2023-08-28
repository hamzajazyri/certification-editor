import { Component, ComponentRef, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentElementComponent {

  @Input() insideDropZone = false;

  @ViewChild('containerRef', {static: true, read: ViewContainerRef}) containerRef!: ViewContainerRef;

  isEditMode$!: Observable<boolean>;

  contentCompRef!: ComponentRef<any>;

  constructor(
    private editorSrv: EditorService
  ) {
    this.isEditMode$ = this.editorSrv.isEditMode$;
  }

  updateContent(compRef: ComponentRef<any>) {
    this.containerRef.clear();
    this.containerRef.insert(compRef.hostView);
    this.contentCompRef = compRef;
  }

  removeContent(){

  }
}
