import { HeadingElementComponent } from "./heading-element/heading-element.component";
import { ParagraphElementComponent } from "./paragraph-element/paragraph-element.component";

export interface ContentElementInterface {
  // onMouseEnter;
}



export const componentTreeMap = {
  p: ParagraphElementComponent,
  h: HeadingElementComponent
}
