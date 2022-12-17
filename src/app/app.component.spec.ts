import "@testing-library/jest-dom/extend-expect";
import {
  expectDisplayTextContent,
  fireClickEvents,
  fireKeydownEvents,
} from "app/test-utils/helpers";
import renderApp from "app/test-utils/render-app";

describe("display on key click", () => {
  describe("equals", () => {
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
  });

  describe("operators", () => {
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
  });

  describe("decimal", () => {
    test("only one per number", async () => {
      const { display, keyPad } = await renderApp();
      const { decimal, one } = keyPad;

      fireClickEvents([one, decimal, decimal]);
      expectDisplayTextContent(display, "", "1.");
    });

    test("prepends decimal with zero", async () => {
      const { display, keyPad } = await renderApp();
      const { add, equals, decimal } = keyPad;

      fireClickEvents([decimal, add, decimal]);
      expectDisplayTextContent(display, "0.+", "0.");

      fireClickEvents([equals, decimal]);
      expectDisplayTextContent(display, "", "0.");
    });
  });

  describe("digits", () => {
    test("limited to 10", async () => {
      const { display, keyPad } = await renderApp();
      const { clear, add, negate, equals, decimal, one } = keyPad;
      const elevenOnes = new Array(11).fill(one);

      fireClickEvents(elevenOnes);
      expectDisplayTextContent(display, "", "1111111111");

      fireClickEvents([clear, add, ...elevenOnes, negate]);
      expectDisplayTextContent(display, "0+", "-1111111111");

      fireClickEvents([clear, decimal, ...elevenOnes]);
      expectDisplayTextContent(display, "", "0.111111111");

      fireClickEvents([clear, add, decimal, ...elevenOnes, negate]);
      expectDisplayTextContent(display, "0+", "-0.111111111");

      fireClickEvents([equals, one]);
      expectDisplayTextContent(display, "", "1");
    });

    test("clears expression and overwrites result", async () => {
      const { display, keyPad } = await renderApp();
      const { equals, one } = keyPad;

      fireClickEvents([equals]);
      expectDisplayTextContent(display, "0=", "0");

      fireClickEvents([one]);
      expectDisplayTextContent(display, "", "1");
    });

    test("overwrites operator", async () => {
      const { display, keyPad } = await renderApp();
      const { add, one } = keyPad;

      fireClickEvents([add, one]);
      expectDisplayTextContent(display, "0+", "1");
    });

    test("overwrites leading zeros", async () => {
      const { display, keyPad } = await renderApp();
      const { zero, one } = keyPad;

      fireClickEvents([zero, one]);
      expectDisplayTextContent(display, "", "1");
    });

    test("appends to digits and decimal", async () => {
      const { display, keyPad } = await renderApp();
      const { decimal, one } = keyPad;

      fireClickEvents([decimal, one, one]);
      expectDisplayTextContent(display, "", "0.11");
    });
  });

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
