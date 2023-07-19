import { GridsterItem } from "angular-gridster2";
import { ComponentMap } from "./widgets/widget.model";

export interface IEditor {
  grid: IGrid;
  widgets: Array<IWidget>;
  datasource: any;
}


export interface IGrid {
  width: number;
  height: number;
  columnsSize: number;
  rowsSize: number;
  style: IGridStyle;
}

export interface IGridStyle {
  padding: number;
  backgroundColor: string;
}

export interface IWidget {
  widgetType: keyof typeof ComponentMap;
  gridConfig: GridsterItem;
  style: IWidgetStyle;
  schema: Array<IWidgetSchema>;
  datasource: any;
  variables?: any;
}

export interface IWidgetStyle extends IGridStyle {
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed';
  borderRadius: number;
  verticalAlign: 'left' | 'right' | 'center';
  horizantalAlign: 'top' | 'bottom' | 'center';
}

export interface IWidgetSchema {
  textMatch: string; // "#{example}"
  mapTo: string; // "datasource.path.to.object.value";
}

export interface IWidgetPosition {
  cols: number,
  rows: number,
  x: number,
  y: number
}


