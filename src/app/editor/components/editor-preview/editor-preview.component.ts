import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEditor, IWidget } from '../../editor.model';
import { EditorService } from '../../services/editor.service';
import { Observable, map } from 'rxjs';
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';
import { WidgetComponent } from '../../widgets/widget.component';
import { Editor } from 'ngx-editor';
import { ComponentMap } from '../../widgets/widget.model';

@Component({
  selector: 'app-editor-preview',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetComponent],
  templateUrl: './editor-preview.component.html',
  styleUrls: ['./editor-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorPreviewComponent implements OnInit {

  templateEditorConfig$!: Observable<IEditor>;
  gridsterConf = gridsterOptions;

  @Output() onEventTrigger = new EventEmitter<{ eventName: string; eventValue: any; }>();

  @Input('editable') isEditable = true;
  @Input('datasource') datasource: any;
  @Input() templateConfig!: IEditor;


  constructor(
    private editorSrv: EditorService
  ) {

    this.templateEditorConfig$ = this.editorSrv.templateConfig$;
    this.gridsterConf.emptyCellDropCallback = this.emptyCellDropCallback.bind(this);

    this.templateEditorConfig$.pipe(
      map(x => x.grid)
    ).subscribe(res => {
      this.gridsterConf = {
        ...this.gridsterConf,
        minCols: res.columnsSize,
        maxCols: res.columnsSize,
        minRows: res.rowsSize,
        maxRows: res.rowsSize
      };
    });
  }

  ngOnInit(): void {

    if(!this.isEditable) {
      this.gridsterConf.displayGrid = 'none';
      this.gridsterConf.draggable!.enabled = false;
      this.gridsterConf.resizable!.enabled = false;
    }
  }

  emptyCellDropCallback(event: DragEvent, item: GridsterItem): void {
    let componentName = event.dataTransfer!.getData('text') as keyof typeof ComponentMap;
    this.editorSrv.pushWidget(componentName, item);
  }

  onWidgetDeleteHandler(widget: IWidget) {
    this.editorSrv.removeWidget(widget);
    this.onEventTriggerHandler({eventName: 'WIDGET_DELTED', eventValue: widget});
  }

  onEventTriggerHandler(event: {eventName: string, eventValue: any}) {
    this.onEventTrigger.emit(event);
  }

}

export const gridsterOptions: GridsterConfig = {
  gridType: 'fit',
  compactType: 'none',
  margin: 0,
  outerMargin: true,
  outerMarginTop: null,
  outerMarginRight: null,
  outerMarginBottom: null,
  outerMarginLeft: null,
  useTransformPositioning: true,
  mobileBreakpoint: 200,
  minCols: 1,
  maxCols: 100,
  minRows: 1,
  maxRows: 100,
  maxItemCols: 100,
  minItemCols: 1,
  maxItemRows: 100,
  minItemRows: 1,
  maxItemArea: 500,
  minItemArea: 1,
  defaultItemCols: 1,
  defaultItemRows: 1,
  // fixedColWidth: 105,
  // fixedRowHeight: 105,
  keepFixedHeightInMobile: false,
  keepFixedWidthInMobile: false,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: true,
  enableEmptyCellDrag: false,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
  draggable: {
    enabled: true,
    ignoreContent: false
  },
  resizable: {
    enabled: true
  },
  swap: true,
  pushItems: true,
  disablePushOnDrag: true,
  disablePushOnResize: true,
  pushDirections: { north: true, east: true, south: true, west: true },
  pushResizeItems: false,
  displayGrid: 'always',
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false
};
/*
export const gridsterOptions: GridsterConfig = {
  gridType: 'fit',
  compactType: 'none',
  margin: 0,
  outerMargin: false,
  useTransformPositioning: true,
  minCols: 1,
  maxCols: 1,
  minRows: 1,
  maxRows: 1,
  maxItemCols: 1,
  minItemCols: 1,
  maxItemRows: 1,
  minItemRows: 1,
  defaultItemCols: 1,
  defaultItemRows: 1,
  // fixedColWidth: 10,
  // fixedRowHeight: 10,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  // emptyCellDragMaxCols: 50,
  // emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
  draggable: {
    enabled: true,
    ignoreContent: false
  },
  resizable: {
    enabled: true
  },
  swap: true,
  pushItems: true,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: { north: true, east: true, south: true, west: true },
  pushResizeItems: false,
  displayGrid: 'always',
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: true
};
*/
