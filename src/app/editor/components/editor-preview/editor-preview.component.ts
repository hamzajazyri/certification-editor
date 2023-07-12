import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEditor } from '../../editor.model';
import { EditorService } from '../../services/editor.service';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { GridsterConfig, GridsterModule } from 'angular-gridster2';

@Component({
  selector: 'app-editor-preview',
  standalone: true,
  imports: [CommonModule, GridsterModule],
  templateUrl: './editor-preview.component.html',
  styleUrls: ['./editor-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorPreviewComponent {

  templateEditorConfig$! : Observable<IEditor>;
  gridsterConf = gridsterOptions;

  constructor(
    private editorSrv: EditorService
  ) {
    this.templateEditorConfig$ = this.editorSrv.templateConfig$.asObservable();


    this.templateEditorConfig$.pipe(
      map( x => x.grid),
      // distinctUntilChanged()
    ).subscribe( res => {
      this.gridsterConf.minCols = res.columnsSize;
      this.gridsterConf.maxCols = res.columnsSize;
      this.gridsterConf.minRows = res.columnsSize;
      this.gridsterConf.maxRows = res.columnsSize;
      this.gridsterConf = {
        ...this.gridsterConf,
        minCols: res.columnsSize,
        maxCols: res.columnsSize,
        minRows: res.rowsSize,
        maxRows: res.rowsSize
      };
      console.log(this.gridsterConf)
    });
  }

}


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
  // ignoreMarginInRow: false,
  draggable: {
    enabled: true,
    ignoreContent: true
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
