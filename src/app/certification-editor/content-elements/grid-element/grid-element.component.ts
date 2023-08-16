import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableZoneDirective } from '../../directives/droppable-zone.directive';

@Component({
  selector: 'app-grid-element',
  standalone: true,
  imports: [CommonModule, DroppableZoneDirective],
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss']
})
export class GridElementComponent {

}
