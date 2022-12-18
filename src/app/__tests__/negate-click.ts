import {
  expectDisplayTextContent,
  fireClickEvents,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("prepends current input with '-' if positive", async () => {
  const { display, keyPad } = await renderApp();
  const { add, negate, one } = keyPad;

  fireClickEvents([one, negate]);
  expectDisplayTextContent(display, "", "-1");

  fireClickEvents([add, one, negate]);
  expectDisplayTextContent(display, "-1+", "-1");
});

test("removes '-' from current input if negative", async () => {
  const { display, keyPad } = await renderApp();
  const { add, negate, one } = keyPad;

  fireClickEvents([one, negate, negate]);
  expectDisplayTextContent(display, "", "1");

  fireClickEvents([add, one, negate, negate]);
  expectDisplayTextContent(display, "1+", "1");
});

test("does not negate zero", async () => {
  const { display, keyPad } = await renderApp();
  const { negate } = keyPad;

  fireClickEvents([negate]);
  expectDisplayTextContent(display, "", "0");
});

test("does nothing after operator", async () => {
  const { display, keyPad } = await renderApp();
  const { add, negate } = keyPad;

  fireClickEvents([add, negate]);
  expectDisplayTextContent(display, "0", "+");
});

test("keeps expression negates result", async () => {
  const { display, keyPad } = await renderApp();
  const { negate, equals, one } = keyPad;

  fireClickEvents([one, equals, negate]);
  expectDisplayTextContent(display, "1=", "-1");
});
