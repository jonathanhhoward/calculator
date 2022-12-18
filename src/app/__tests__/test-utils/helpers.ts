import { fireEvent } from "@testing-library/angular";
import { Display } from "app/__tests__/test-utils/types";

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
