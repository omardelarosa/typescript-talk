import renderer from "./renderer.js";

export function render(): string {
  return renderer();
}

export default {
  render,
  greeter: () => {
    return {
      greeting: "hello"
    };
  }
};
