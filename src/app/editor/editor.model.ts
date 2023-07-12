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
  bgColor: string;
}

export interface IWidget {
  widgetType: string;
  position: IWidgetPosition;
  style: IWidgetStyle;
  schema: IWidgetSchema;
  datasource: any;
}

export interface IWidgetStyle extends IGridStyle {
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed';
  borderRadius: number;
  verticalAlign: contentAlign;
  horizantalAlign: contentAlign;
}
type contentAlign = 'left' | 'right' | 'center';

export interface IWidgetSchema {
  textMatch: string; // "#{example}"
  mapTo: string; // "datasource.path.to.object.value";
}

export interface IWidgetPosition {
  columnStart: number,
  rowStart: number,
  columnWidth: number,
  columnHeight: number
}


