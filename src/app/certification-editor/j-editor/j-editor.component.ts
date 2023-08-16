import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderElementComponent } from '../content-elements/placeholder-element/placeholder-element.component';
import { DroppableDirective } from '../directives/droppable.directive';

@Component({
  selector: 'app-j-editor',
  standalone: true,
  imports: [CommonModule, PlaceholderElementComponent, DroppableDirective],
  templateUrl: './j-editor.component.html',
  styleUrls: ['./j-editor.component.scss']
})
export class JEditorComponent {
  isEmpty = true;
  isPreviewMode = false;

  @ViewChild('containerRef', {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef;

}
