import { componentTreeMap } from "../content-elements/content-element.interface";

export function parseObject(objStr: string): {componentType: keyof typeof componentTreeMap, componentData: any}{
  return JSON.parse(objStr);
}
