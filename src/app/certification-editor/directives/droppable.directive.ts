import { Directive, ElementRef, EventEmitter, Host, HostListener, Output, Renderer2 } from '@angular/core';
import { GridsterContainerComponent } from '../components/gridster-container/gridster-container.component';

@Directive({
  selector: '[Droppable]',
  standalone: true
})
export class DroppableDirective {

  @Output('onDragEmit') onDragEmit = new EventEmitter<void>();

  isEntered: boolean = false;

  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Host() private component: GridsterContainerComponent) {

  }

  @HostListener('dragover', ['$event'])
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event'])
  handleDragEnter(event: DragEvent) {
    console.log("DRAG EVENT ENTER");
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent) {
    console.log("DRAG EVENT LEAVE");
    this.isEntered = false;
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    event.stopPropagation();
    console.log("drop");
    this.onDragEmit.emit();
    this.component.pushItem(event.dataTransfer!.getData('text'));
    return false;
  }


}
