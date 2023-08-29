import { Directive, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { componentTreeMap } from '../content-elements/content-element.interface';
import { parseObject } from './helper';
import { ContentElementComponent } from '../content-elements/content-element.component';
import { EditorService } from '../services/editor.service';

@Directive({
  selector: '[DroppableZone]',
  standalone: true
})
export class DroppableZoneDirective {

  constructor(
    private element: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private editorSrv: EditorService
  ) { }



  @HostListener('dragenter', ['$event'])
  handleDragEnter(event: DragEvent) {
    console.log("DRAG EVENT ENTER");
    this.element.nativeElement.style.borderColor = 'green';
    this.element.nativeElement.style.backgroundColor = 'rgba(0,200,0,.1)';
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent) {
    console.log("DRAG EVENT Leave");
    this.element.nativeElement.style.borderColor = '#2C363A';
    this.element.nativeElement.style.backgroundColor = '#F0F4F6';
  }


  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {


    event.stopPropagation();

    const obj = parseObject(event.dataTransfer!.getData('text/plain'));
    // const compRef = this.viewContainerRef.createComponent(componentTreeMap[obj.componentType]);
    // (compRef.instance as any).data = obj.componentData;

    const contentElementRef = this.viewContainerRef.createComponent(ContentElementComponent);
    contentElementRef.instance.insideDropZone = true;

    contentElementRef.instance.onContentDelete.subscribe( _ => {
      contentElementRef.destroy();
      this.element.nativeElement.style.display = 'block';
      this.element.nativeElement.setAttribute('aria-empty', 'true');
      this.element.nativeElement.style.borderColor = '#2C363A';
      this.element.nativeElement.style.backgroundColor = '#F0F4F6';
    });

    contentElementRef.instance.updateContent(obj);
    this.viewContainerRef.insert(contentElementRef.hostView);
    this.element.nativeElement.style.display = 'none';
    this.element.nativeElement.setAttribute('aria-empty', 'false');
    return false;
  }

}
