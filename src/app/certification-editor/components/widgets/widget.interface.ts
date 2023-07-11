import { DialogRef } from "@angular/cdk/dialog";
import { GridsterItem } from "angular-gridster2";
import { WidgetConfig, WidgetModalInterface } from "./widget/widget.component";
import { EventEmitter } from "@angular/core";
import { Editor } from "ngx-editor";

export interface WidgetInterface {
  gridsterItem: GridsterItem; // maybe will be deleted
  widgetConfig: WidgetConfig;
  data: any;
  setData(data:any): void;
  openModal<T  extends WidgetModalInterface>(): DialogRef<T>;



  onEditorEdit: EventEmitter<Editor>;
  onEditorEditEnd: EventEmitter<void>;
}
