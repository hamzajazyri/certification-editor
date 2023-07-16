import { EventEmitter, Output } from "@angular/core";
import { IWidgetSchema } from "../editor.model";
import { TextEditorWidgetComponent } from "./text-editor-widget/text-editor-widget.component";

export interface WidgetContentComponentInterface {

  onEventTrigger: EventEmitter<{eventName: string, eventValue: any}>;

  schema: Array<IWidgetSchema>;
  datasource: any;


}


export const ComponentMap = {
  TextEditor: TextEditorWidgetComponent,
  // heading: TextWidgetComponent,
  // image: ImageWidgetComponent
};
