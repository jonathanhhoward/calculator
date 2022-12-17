import {
  expectDisplayTextContent,
  fireClickEvents,
} from "app/test-utils/helpers";
import renderApp from "app/test-utils/render-app";

test("ignored while result displayed", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals, equals]);
  expectDisplayTextContent(display, "1+1=", "2");
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals } = keyPad;

  fireClickEvents([add, equals]);
  expectDisplayTextContent(display, "0=", "0");
});

test("appends to expression and displays result", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, one } = keyPad;

  fireClickEvents([one, add, one, equals]);
  expectDisplayTextContent(display, "1+1=", "2");
});
