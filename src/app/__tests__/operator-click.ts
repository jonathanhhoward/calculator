import {
  expectDisplayTextContent,
  fireClickEvents,
} from "app/test-utils/helpers";
import renderApp from "app/test-utils/render-app";

test("starts new expression from a result", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals]);
  expectDisplayTextContent(display, "1+1=", "2");

  fireClickEvents([add]);
  expectDisplayTextContent(display, "2", "+");
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { multiply, add } = keyPad;

  fireClickEvents([multiply, add]);
  expectDisplayTextContent(display, "0", "+");
});

test("appends input to expression", async () => {
  const { display, keyPad } = await renderApp();
  const { add, decimal } = keyPad;

  fireClickEvents([add, decimal, add]);
  expectDisplayTextContent(display, "0+0.", "+");
});
