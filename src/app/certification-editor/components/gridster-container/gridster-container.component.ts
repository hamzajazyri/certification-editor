import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWidgetComponent } from '../widgets/text-widget/text-widget.component';
import { Editor } from 'ngx-editor';
import { GridsterItem, GridsterItemComponentInterface, GridsterModule } from 'angular-gridster2';
import { gridsterConfig, gridsterItemConfig } from './gridster-const';

@Component({
  selector: 'app-gridster-container',
  standalone: true,
  imports: [CommonModule, TextWidgetComponent, GridsterModule],
  templateUrl: './gridster-container.component.html',
  styleUrls: ['./gridster-container.component.scss']
})
export class GridsterContainerComponent implements OnInit {

  @Output() onWidgetEdit = new EventEmitter<Editor>();

  @Input() width: number = 800;
  @Input() height: number = 1050;
  @Input() columnsSize: number = 24;
  @Input() rowsSize: number = 52;
  @Input() bgColor: string = '#fff';

  gridsterDefaultConfig = gridsterConfig;


  gridsterItemDefaultConfig: GridsterItem = gridsterItemConfig;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gridsterDefaultConfig.minCols = this.columnsSize;
    this.gridsterDefaultConfig.maxCols = this.columnsSize;
    this.gridsterDefaultConfig.minRows = this.rowsSize;
    this.gridsterDefaultConfig.maxRows = this.rowsSize;
    this.gridsterDefaultConfig.fixedColWidth = Math.round(this.width/this.columnsSize);
    this.gridsterDefaultConfig.fixedRowHeight = Math.round(this.height/this.rowsSize);
  }

  editWidget(editor: Editor){

    // this.gridsterDefaultConfig.resizable!.enabled = false;
    this.gridsterDefaultConfig = {
      ...this.gridsterDefaultConfig,
      draggable: { enabled: false},
      resizable: {enabled: false}
    }
    this.cdr.detectChanges();
    this.onWidgetEdit.emit(editor);
  }


  print() {

  }
}
