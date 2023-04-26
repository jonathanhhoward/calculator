import {
  fireClickEvents,
  getTextContent,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("starts new expression from a result", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals]);
  expect(getTextContent(display)).toEqual({ expression: "1+1=", input: "2" });

  fireClickEvents([add]);
  expect(getTextContent(display)).toEqual({ expression: "2", input: "+" });
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { multiply, add } = keyPad;

  fireClickEvents([multiply, add]);
  expect(getTextContent(display)).toEqual({ expression: "0", input: "+" });
});

test("appends input to expression", async () => {
  const { display, keyPad } = await renderApp();
  const { add, decimal } = keyPad;

  fireClickEvents([add, decimal, add]);
  expect(getTextContent(display)).toEqual({ expression: "0+0.", input: "+" });
});

test("appends zero to empty exponent", async () => {
  const { display, keyPad } = await renderApp();
  const { add, exponent } = keyPad;

  fireClickEvents([exponent, add]);
  expect(getTextContent(display)).toEqual({ expression: "0e0", input: "+" });
});
