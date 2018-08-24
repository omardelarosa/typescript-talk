import { renderer } from "./renderer";

export function render(): string {
  return renderer()
};

export default {
  greeter: () => {
    return {
      greeting: 'hello'
    }
  }
}