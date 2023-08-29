import { Directive, ElementRef, Host, HostListener, Input, Optional, ViewContainerRef } from '@angular/core';
import { componentTreeMap } from '../content-elements/content-element.interface';
import { parseObject } from './helper';
import { ContentElementComponent } from '../content-elements/content-element.component';
import { EditorService } from '../services/editor.service';
import { Grid2ColumnsLeftElementComponent, Grid2ColumnsRightElementComponent, Grid3ColumnsElementComponent } from '../content-elements/grid-element/grid-element.component';

@Directive({
  selector: '[DroppableZone]',
  standalone: true
})
export class DroppableZoneDirective {

  @Input() gridType!: 'Grid2ColumnsLeft' | 'Grid2ColumnsRight' | 'Grid3Columns';
  @Input() gridZone!: 'left' | 'middle' | 'right';

  constructor(
    @Host() @Optional() private hostComp1: Grid2ColumnsLeftElementComponent,
    @Host() @Optional() private hostComp2: Grid2ColumnsRightElementComponent,
    @Host() @Optional() private hostComp3: Grid3ColumnsElementComponent,
    private element: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private editorSrv: EditorService
  ) { }

  get hostComp() {
    if(this.gridType === 'Grid2ColumnsLeft')
      return this.hostComp1;
    if(this.gridType === 'Grid2ColumnsRight')
      return this.hostComp2;
    return this.hostComp3;
  }

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

    this.hostComp.data[this.gridZone] = obj;
    this.hostComp.onDataChange.emit({dataKey: this.gridZone, dataValue: obj});
    return false;
  }

}
