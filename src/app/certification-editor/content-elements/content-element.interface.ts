import { Grid2ColumnsLeftElementComponent, Grid2ColumnsRightElementComponent, Grid3ColumnsElementComponent } from "./grid-element/grid-element.component";
import { HeadingElementComponent } from "./heading-element/heading-element.component";
import { ImageElementComponent } from "./image-element/image-element.component";
import { ParagraphElementComponent } from "./paragraph-element/paragraph-element.component";
import { SpacerElementComponent } from "./spacer-element/spacer-element.component";
import { TableElementComponent } from "./table-element/table-element.component";

export interface ContentElementInterface {
  // onMouseEnter;
}



export const componentTreeMap = {
  p: ParagraphElementComponent,
  h: HeadingElementComponent,
  layoutTwoColLeft: Grid2ColumnsLeftElementComponent,
  layoutTwoColRight: Grid2ColumnsRightElementComponent,
  layoutThreeCol: Grid3ColumnsElementComponent,
  img: ImageElementComponent,
  table: TableElementComponent,
  spacer: SpacerElementComponent
}
