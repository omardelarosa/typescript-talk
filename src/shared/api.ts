import { renderer } from "./renderer";
export class API {
  public name: string;
  constructor() {}

  public render(): string {
    return renderer();
  }
}
