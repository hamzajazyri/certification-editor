import { EventEmitter, Output } from "@angular/core";
import { IWidgetSchema } from "../editor.model";
import { TextEditorWidgetComponent } from "./text-editor-widget/text-editor-widget.component";
import { ImageWidgetComponent } from "./image-widget/image-widget.component";
import { DynamicTableWidgetComponent } from "./dynamic-table-widget/dynamic-table-widget.component";

export interface WidgetContentComponentInterface {

  isEditMode: boolean;

  onEventTrigger: EventEmitter<{eventName: string, eventValue: any}>;

  schema: Array<IWidgetSchema>;
  datasource: any;


}


export const ComponentMap = {
  TextEditor: TextEditorWidgetComponent,
  ImageComp: ImageWidgetComponent,
  DynamicTable: DynamicTableWidgetComponent
};
