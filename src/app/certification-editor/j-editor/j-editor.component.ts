import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderElementComponent } from '../content-elements/placeholder-element/placeholder-element.component';
import { DroppableDirective } from '../directives/droppable.directive';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-j-editor',
  standalone: true,
  imports: [CommonModule, PlaceholderElementComponent, DroppableDirective],
  templateUrl: './j-editor.component.html',
  styleUrls: ['./j-editor.component.scss']
})
export class JEditorComponent implements OnInit {

  isEditMode = true;

  isEmpty = true;

  @ViewChild('containerRef', {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef;


  constructor(
    private editorSrv: EditorService
  ){}

  ngOnInit(): void {
    this.editorSrv.isEditMode$.subscribe( res => this.isEditMode = res);
  }
}
