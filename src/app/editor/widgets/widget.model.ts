import { EventEmitter, Output } from "@angular/core";
import { IWidgetSchema } from "../editor.model";
import { TextEditorWidgetComponent } from "./text-editor-widget/text-editor-widget.component";
import { ImageWidgetComponent } from "./image-widget/image-widget.component";
import { DynamicTableWidgetComponent } from "./dynamic-table-widget/dynamic-table-widget.component";
import { IFormGroupStyle } from "../shared/form-group-style/form-group-style.component";

export interface WidgetContentComponentInterface {

  isEditMode: boolean;

  // handle any event triggered from widget content component
  onEventTrigger: EventEmitter<{eventName: string, eventValue: any}>;

  // schema that will be used to bind variables with text
  schema: Array<IWidgetSchema>;

  datasource: any;

  // to init the custom widget variable
  variables: any;

  // will handle all variables related to specific object
  // on edit widget, all content will be renderer in widget style tab
  // and binding directly to widget
  variablesGroups: Array<IFormGroupStyle>;
}


export const ComponentMap = {
  TextEditor: TextEditorWidgetComponent,
  ImageComp: ImageWidgetComponent,
  DynamicTable: DynamicTableWidgetComponent
};
