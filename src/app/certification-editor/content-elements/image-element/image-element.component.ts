import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-element.component.html',
  styleUrls: ['./image-element.component.scss']
})
export class ImageElementComponent {

  @Input() data: any;

}
