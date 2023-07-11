import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWidgetComponent } from '../widgets/text-widget/text-widget.component';
import { Editor } from 'ngx-editor';
import { GridsterItem, GridsterItemComponentInterface, GridsterModule } from 'angular-gridster2';
import { gridsterConfig, gridsterItemConfig } from './gridster-const';
import { ImageWidgetComponent } from '../widgets/image-widget/image-widget.component';
import { WidgetInterface } from '../widgets/widget.interface';
import { ComponentMap, WidgetComponent } from '../widgets/widget/widget.component';
import { DroppableDirective } from '../../directives/droppable.directive';
// import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-gridster-container',
  standalone: true,
  imports: [CommonModule, TextWidgetComponent, GridsterModule, ImageWidgetComponent, WidgetComponent, DroppableDirective],
  templateUrl: './gridster-container.component.html',
  styleUrls: ['./gridster-container.component.scss']
})
export class GridsterContainerComponent implements OnInit {

  @Output() onWidgetEdit = new EventEmitter<Editor>();
  @Output() onWidgetEditEnd = new EventEmitter<void>();

  @Input() width: number = 800;
  @Input() height: number = 1050;
  @Input() columnsSize: number = 24;
  @Input() rowsSize: number = 52;
  @Input() bgColor: string = '#fff';

  isPreviewMode = false;

  gridsterDefaultConfig = gridsterConfig;
  widgetItems: Array<WidgetItem> = [];

  @ViewChild('gridsterRef', {static: true, read: ElementRef}) gridsterRef!: ElementRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gridsterDefaultConfig.minCols = this.columnsSize;
    this.gridsterDefaultConfig.maxCols = this.columnsSize;
    this.gridsterDefaultConfig.minRows = this.rowsSize;
    this.gridsterDefaultConfig.maxRows = this.rowsSize;
    this.gridsterDefaultConfig.fixedColWidth = Math.round(this.width/this.columnsSize);
    this.gridsterDefaultConfig.fixedRowHeight = Math.round(this.height/this.rowsSize);
  }

  editWidget(editor: Editor | null){
    if(editor == null){
      this.gridsterDefaultConfig = {...gridsterConfig}
      this.onWidgetEditEnd.emit();
      return;
    }
      // this.gridsterDefaultConfig.resizable!.enabled = false;
    this.gridsterDefaultConfig = {
      ...this.gridsterDefaultConfig,
      draggable: { enabled: false},
      resizable: {enabled: false}
    }
    this.onWidgetEdit.emit(editor!);
  }


  pushItem(component: string){
    this.widgetItems.push({
      component: component as keyof typeof ComponentMap,
      data: {},
      gridItem: gridsterItemConfig
    });
  }

  togglePreviewMode() {
    if(this.isPreviewMode)
      this.gridsterDefaultConfig = gridsterConfig;

    if(!this.isPreviewMode) {
      this.gridsterDefaultConfig = {
        ...this.gridsterDefaultConfig,
        draggable: { enabled: false},
        resizable: {enabled: false},
        displayGrid: 'none'
      };
    }
    this.isPreviewMode = !this.isPreviewMode;
  }

  print() {
    // console.log(this.gridsterRef.nativeElement.innerHTML)
    // // Create a new jsPDF instance
    // const pdf = new jsPDF();

    // // Generate PDF from the HTML element
    // pdf.html(this.gridsterRef.nativeElement, {
    //   callback: (doc) => {
    //     doc.save('filename.pdf');
    //   },
    //   width: this.gridsterRef.nativeElement.clientWidth
    // });

    // Save the PDF
  }
}


export interface WidgetItem {
  component: keyof typeof ComponentMap,
  data: any,
  gridItem: GridsterItem
}
