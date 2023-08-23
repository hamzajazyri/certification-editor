import { Component, ComponentRef, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentElementComponent {

  @Input() isEditable = true;
  @Input() insideDropZone = false;

  @ViewChild('containerRef', {static: true, read: ViewContainerRef}) containerRef!: ViewContainerRef;

  contentCompRef!: ComponentRef<any>;

  updateContent(compRef: ComponentRef<any>) {
    this.containerRef.clear();
    this.containerRef.insert(compRef.hostView);
    this.contentCompRef = compRef;
  }

  removeContent(){

  }
}
