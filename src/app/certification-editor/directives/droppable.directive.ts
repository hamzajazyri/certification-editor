import { ComponentRef, Directive, Host, HostListener, Input, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { HeadingElementComponent } from '../content-elements/heading-element/heading-element.component';
import { JEditorComponent } from '../j-editor/j-editor.component';
import { PlaceholderElementComponent } from '../content-elements/placeholder-element/placeholder-element.component';
import { componentTreeMap } from '../content-elements/content-element.interface';

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
    if(index === 0)
      this.componentRefs.unshift(compRef);
    else if (index)
      this.componentRefs.splice(index, 0, compRef);
    else
      this.componentRefs.push(compRef);

    // update x-index
    for(let i=0; i<this.componentRefs.length; i++) {
      (this.componentRefs[i].location.nativeElement as HTMLElement).setAttribute('x-index', i.toString());
    }
    (compRef.location.nativeElement as HTMLElement).addEventListener('dragenter', () => {
      console.log((compRef.location.nativeElement as HTMLElement).getAttribute('x-index'));
      this.isEntered = true;
      this.containerRef.move(this.placeHolderRef.hostView, parseInt((compRef.location.nativeElement as HTMLElement).getAttribute('x-index')!));
      this.placeHolderIndex = parseInt((compRef.location.nativeElement as HTMLElement).getAttribute('x-index')!);
    } );
    (compRef.location.nativeElement as HTMLElement).addEventListener('dragleave', () => {
      this.isEntered = false;
    });
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
    // for(let i=0; i<this.componentRefs.length; i++) {
    //   (this.componentRefs[i].location.nativeElement as HTMLElement).addEventListener('dragenter', () => {
    //     this.isEntered = true;
    //     this.containerRef.move(this.placeHolderRef.hostView, i);
    //     this.placeHolderIndex = i;
    //   } );
    //   (this.componentRefs[i].location.nativeElement as HTMLElement).addEventListener('dragleave', () => {
    //     this.isEntered = false;
    //   });
    // }

    // this.loadComponent(PlaceholderElementComponent);
  }

  @HostListener('dragleave', ['$event'])
  handleDragLeave(event: DragEvent) {
    console.log("DRAG EVENT LEAVE");
    if(this.isEntered){
      return;
    }
    this.isEntered = false;
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    console.log("laod component")

    event.stopPropagation();
    this.containerRef.detach(this.placeHolderIndex);
    console.log();
    const componentTypeKey = event.dataTransfer!.getData('text/plain')  as keyof typeof componentTreeMap;
    this.loadComponent(componentTreeMap[componentTypeKey], this.placeHolderIndex);
    this.placeHolderIndex = -1;
    this.hostComp.isEmpty = false;

    // create component
    // add component

    // this.hostComponent.addChild();

    return false;
  }


}
