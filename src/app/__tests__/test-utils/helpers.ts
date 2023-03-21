import { fireEvent } from "@testing-library/angular";
import { Display, DisplayTextContent } from "app/__tests__/test-utils/types";

export function fireClickEvents(nodes: Node[]) {
  nodes.forEach((node) => fireEvent.click(node));
}

export function fireKeydownEvents(codes: string[]) {
  codes.forEach((code) => fireEvent.keyDown(document.body, { code }));
}

export function expectDisplayTextContent(
  display: Display,
  expectedExpression: string,
  expectedInput: string
) {
  const { expression, input } = display;

  expect(expression.textContent).toBe(expectedExpression);
  expect(input.textContent).toBe(expectedInput);
}

export function getTextContent(display: Display): DisplayTextContent {
  return {
    expression: display.expression.textContent,
    input: display.input.textContent,
  };
}
