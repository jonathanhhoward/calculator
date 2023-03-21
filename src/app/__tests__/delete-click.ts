import {
  fireClickEvents,
  getTextContent,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("does nothing after operator", async () => {
  const { display, keyPad } = await renderApp();
  const { del, add, one } = keyPad;

  fireClickEvents([one, add, del]);
  expect(getTextContent(display)).toEqual({ expression: "1", input: "+" });
});

test("does nothing after result", async () => {
  const { display, keyPad } = await renderApp();
  const { del, equals, one } = keyPad;

  fireClickEvents([one, equals, del]);
  expect(getTextContent(display)).toEqual({ expression: "1=", input: "1" });
});

test("overwrites current number input with zero", async () => {
  const { display, keyPad } = await renderApp();
  const { del, add, negate, one } = keyPad;

  fireClickEvents([one, del]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0" });

  fireClickEvents([add, one, del]);
  expect(getTextContent(display)).toEqual({ expression: "0+", input: "0" });

  fireClickEvents([add, one, negate, del]);
  expect(getTextContent(display)).toEqual({ expression: "0+0+", input: "0" });
});
