import {
  fireClickEvents,
  getTextContent,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("ignored while result displayed", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals, equals]);
  expect(getTextContent(display)).toEqual({ expression: "1+1=", input: "2" });
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals } = keyPad;

  fireClickEvents([add, equals]);
  expect(getTextContent(display)).toEqual({ expression: "0=", input: "0" });
});

test("appends to expression and displays result", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals]);
  expect(getTextContent(display)).toEqual({ expression: "1+1=", input: "2" });
});

test("appends zero to empty exponent", async () => {
  const { display, keyPad } = await renderApp();
  const { equals, exponent } = keyPad;

  fireClickEvents([exponent, equals]);
  expect(getTextContent(display)).toEqual({ expression: "0e0=", input: "0" });
});

test("appends zero to decimal", async () => {
  const { display, keyPad } = await renderApp();
  const { equals, decimal } = keyPad;

  fireClickEvents([decimal, equals]);
  expect(getTextContent(display)).toEqual({ expression: "0.0=", input: "0" });
});
