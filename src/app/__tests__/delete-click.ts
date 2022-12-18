import {
  expectDisplayTextContent,
  fireClickEvents,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("does nothing after operator", async () => {
  const { display, keyPad } = await renderApp();
  const { del, add, one } = keyPad;

  fireClickEvents([one, add, del]);
  expectDisplayTextContent(display, "1", "+");
});

test("does nothing after result", async () => {
  const { display, keyPad } = await renderApp();
  const { del, equals, one } = keyPad;

  fireClickEvents([one, equals, del]);
  expectDisplayTextContent(display, "1=", "1");
});

test("overwrites current number input with zero", async () => {
  const { display, keyPad } = await renderApp();
  const { del, add, negate, one } = keyPad;

  fireClickEvents([one, del]);
  expectDisplayTextContent(display, "", "0");

  fireClickEvents([add, one, del]);
  expectDisplayTextContent(display, "0+", "0");

  fireClickEvents([add, one, negate, del]);
  expectDisplayTextContent(display, "0+0+", "0");
});
