import { ComponentRef, Directive, Host, HostListener, Input, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { HeadingElementComponent } from '../content-elements/heading-element/heading-element.component';
import { JEditorComponent } from '../j-editor/j-editor.component';
import { PlaceholderElementComponent } from '../content-elements/placeholder-element/placeholder-element.component';

@Directive({
  selector: '[Droppable]',
  standalone: true
})
export class DroppableDirective {

  @Input() containerRef!: ViewContainerRef;

  isEntered: boolean = false;
  componentRefs: Array<ComponentRef<any>> = [];
  placeHolderRef!: ComponentRef<PlaceholderElementComponent>;
  placeHolderIndex = -1;

  constructor(
    @Host() private hostComp: JEditorComponent
  ) { }

  loadComponent(componentType: any, index: number | undefined = undefined) {
    // {projectableNodes: [[x]]}
    const compRef = this.containerRef.createComponent(componentType);
    this.containerRef.insert(compRef.hostView, index);
    if (index)
      this.componentRefs.splice(index, 0, compRef);
    else
      this.componentRefs.push(compRef);
    // this.viewContainerRef.
  }

  loadPlaceHolder(){
    if(this.placeHolderRef && this.placeHolderIndex === -1){
      this.containerRef.insert(this.placeHolderRef.hostView, this.containerRef.length)
      this.placeHolderIndex = this.containerRef.length-1;
      return;
    }
    if(this.placeHolderRef) {
      this.containerRef.move(this.placeHolderRef.hostView, this.containerRef.length-1);
      this.placeHolderIndex = this.containerRef.length-1;
      return;
    }

    this.placeHolderRef = this.containerRef.createComponent(PlaceholderElementComponent);
    this.containerRef.insert(this.placeHolderRef.hostView);
    this.placeHolderIndex = 0;
  }

  @HostListener('dragover', ['$event'])
  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event'])
  handleDragEnter(event: DragEvent) {
    console.log("DRAG EVENT ENTER");
    if(!this.isEntered){
      this.loadPlaceHolder();
    }
    for(let i=0; i<this.componentRefs.length; i++) {
      (this.componentRefs[i].location.nativeElement as HTMLElement).addEventListener('dragenter', () => {
        this.isEntered = true;
        this.containerRef.move(this.placeHolderRef.hostView, i);
        this.placeHolderIndex = i;
      } );
      (this.componentRefs[i].location.nativeElement as HTMLElement).addEventListener('dragleave', () => {
        this.isEntered = false;
      });
    }

    // this.loadComponent(PlaceholderElementComponent);
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent) {
    console.log("DRAG EVENT LEAVE");
    if(this.isEntered){
      return;
    }
    this.isEntered = false;
    this.clearPlaceHolderElements();
  }

  clearPlaceHolderElements() {
    return;
    console.log("CLEAR PLACEHOLDER")
    let length = this.componentRefs.length;
    for (let i = 0; i < length; i++) {
      if (this.componentRefs[i].instance instanceof PlaceholderElementComponent) {
        this.containerRef.remove(i);
        this.componentRefs[i].destroy();
        this.componentRefs.splice(i, 1);
        length -=1;
      }
    }
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    console.log("laod component")

    event.stopPropagation();
    this.containerRef.detach(this.placeHolderIndex);
    this.loadComponent(HeadingElementComponent, this.placeHolderIndex);
    this.placeHolderIndex = -1;
    this.hostComp.isEmpty = false;
    this.clearPlaceHolderElements();
    // create component
    // add component

    // this.hostComponent.addChild(event.dataTransfer!.getData('text/html'));

    return false;
  }


}
