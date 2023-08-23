import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableZoneDirective } from '../../directives/droppable-zone.directive';

@Component({
  selector: 'app-grid-2-columns-left-element',
  standalone: true,
  imports: [CommonModule, DroppableZoneDirective],
  template: `
  <div class="j-grid-element-2">
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
  </div>
  `,
  styles: [
    `.j-grid-element-2 {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 20px;
        padding:20px;
        background:#fff;
    }`,
    `.j-grid-element-2 .droppable-item {
        width: 100%;
        padding: 20px;
        border: 1px dashed #2C363A;
        background: #F0F4F6;
        border-radius: 7px;
        text-align: center;
        color:#333;
        font-size: 13px;
    }`
  ]
})
export class Grid2ColumnsLeftElementComponent {
}



@Component({
  selector: 'app-grid-2-columns-right-element',
  standalone: true,
  imports: [CommonModule, DroppableZoneDirective],
  template: `
  <div class="j-grid-element">
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
  </div>
  `,
  styles: [
    `.j-grid-element {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 20px;
        padding:20px;
        background:#fff;
    }`,
    `.j-grid-element .droppable-item {
        width: 100%;
        padding: 20px;
        border: 1px dashed #2C363A;
        background: #F0F4F6;
        border-radius: 7px;
        text-align: center;
        color:#333;
        font-size: 13px;
    }`
  ]
})
export class Grid2ColumnsRightElementComponent {
}



@Component({
  selector: 'app-grid-3-columns-element',
  standalone: true,
  imports: [CommonModule, DroppableZoneDirective],
  template: `
  <div class="j-grid-element">
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
    <div class="droppable-item" DroppableZone>
      Drop Content Here
    </div>
  </div>
  `,
  styles: [
    `.j-grid-element {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        padding:20px;
        background:#fff;
    }`,
    `.j-grid-element .droppable-item {
        width: 100%;
        padding: 20px;
        border: 1px dashed #2C363A;
        background: #F0F4F6;
        border-radius: 7px;
        text-align: center;
        color:#333;
        font-size: 13px;
    }`
  ]
})
export class Grid3ColumnsElementComponent {
}
