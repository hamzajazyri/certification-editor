import { GridsterConfig, GridsterItem } from 'angular-gridster2';

export const gridsterConfig: GridsterConfig = {
  gridType: 'fixed',
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
  fixedColWidth: 105,
  fixedRowHeight: 105,
  keepFixedHeightInMobile: false,
  keepFixedWidthInMobile: false,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
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
  scrollToNewItems: false
};

export const gridsterItemConfig: GridsterItem = {
  cols: 10, // Width of the item in grid columns (should be within the maximum allowed)
  rows: 10, // Height of the item in grid rows (should be within the maximum allowed)
  x: 0, // X position of the item in the grid
  y: 0, // Y position of the item in the grid
  dragEnabled: true, // Allow item to be dragged
  resizeEnabled: true, // Allow item to be resized
  headerClicked: true, // Add a new property to track if the header has been clicked*
  // clone: true,
};
