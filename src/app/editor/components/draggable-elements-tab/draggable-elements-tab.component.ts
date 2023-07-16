import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DraggableDirective } from '../../directives/draggable.directive';

@Component({
  selector: 'app-draggable-element',
  standalone: true,
  imports: [CommonModule, DraggableDirective],
  template: `
  <div class="draggable-item" Draggable [component]="component">
    <div class="draggable-item-info">
      <svg>
        <use [attr.xlink:href]="icon" />
      </svg>
      <h3>{{label}}</h3>
    </div>
    <svg class="drag-icon">
      <use xlink:href="assets/editor-assets/icons/drag-drop-icon.svg#drag-drop-icon" />
    </svg>
  </div>
  `,
})
export class DraggableElementComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() component!: string;
}

@Component({
  selector: 'app-draggable-elements-tab',
  standalone: true,
  imports: [CommonModule, DraggableElementComponent],
  templateUrl: './draggable-elements-tab.component.html',
  styleUrls: ['./draggable-elements-tab.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DraggableElementsTabComponent {
  elements = [{
    iconUrl: 'assets/editor-assets/icons/text-icon.svg#text-icon',
    text: 'Text Editor',
    component: 'TextEditor'
  },{
    iconUrl: 'assets/editor-assets/icons/image-icon.svg#image-icon',
    text: 'Image',
    html: 'Image'
  }, {
    iconUrl: 'assets/editor-assets/icons/table-icon.svg#table-icon',
    text: 'Dynamic Table',
    html: 'TableDynamic'
  }];
}
