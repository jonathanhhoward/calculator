import "@testing-library/jest-dom/extend-expect";
import {
  expectDisplayTextContent,
  fireClickEvents,
  fireKeydownEvents,
} from "app/test-utils/helpers";
import renderApp from "app/test-utils/render-app";

describe("display on key click", () => {
  describe("negate", () => {
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
  });

  describe("keyboard", () => {
    test("handles numpad keydown events", async () => {
      const { display } = await renderApp();
      fireKeydownEvents([
        "Numpad1",
        "NumpadDecimal",
        "Numpad0",
        "NumpadAdd",
        "Numpad2",
        "Numpad3",
        "NumpadSubtract",
        "Numpad4",
        "Numpad5",
        "NumpadMultiply",
        "Numpad6",
        "Numpad7",
        "NumpadDivide",
        "Numpad8",
        "Numpad9",
        "NumpadEnter",
      ]);

      expectDisplayTextContent(display, "1.0+23−45×67÷89=", "-9.876404494");
    });
  });
});
