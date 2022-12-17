/* eslint-disable jest/expect-expect */
import { fireEvent } from "@testing-library/angular";
import "@testing-library/jest-dom/extend-expect";
import renderApp from "app/test-utils/render-app";
import { Display, KeyPad } from "app/test-utils/types";

function fireClickEvents(nodes: Node[]) {
  nodes.forEach((node) => fireEvent.click(node));
}

function fireKeydownEvents(codes: string[]) {
  codes.forEach((code) => fireEvent.keyDown(document.body, { code }));
}

function expectDisplayTextContent(
  display: Display,
  expectedExpression: string,
  expectedInput: string
) {
  const { expression, input } = display;

  expect(expression.textContent).toBe(expectedExpression);
  expect(input.textContent).toBe(expectedInput);
}

describe("display on key click", () => {
  let display: Display;
  let keyPad: KeyPad;

  beforeEach(async () => {
    const app = await renderApp();
    display = app.display;
    keyPad = app.keyPad;
  });

  describe("delete", () => {
    test("does nothing after operator", () => {
      const { del, add, one } = keyPad;

      fireClickEvents([one, add, del]);
      expectDisplayTextContent(display, "1", "+");
    });

    test("does nothing after result", () => {
      const { del, equals, one } = keyPad;

      fireClickEvents([one, equals, del]);
      expectDisplayTextContent(display, "1=", "1");
    });

    test("overwrites current number input with zero", () => {
      const { del, add, negate, one } = keyPad;

      fireClickEvents([one, del]);
      expectDisplayTextContent(display, "", "0");

      fireClickEvents([add, one, del]);
      expectDisplayTextContent(display, "0+", "0");

      fireClickEvents([add, one, negate, del]);
      expectDisplayTextContent(display, "0+0+", "0");
    });
  });

  describe("equals", () => {
    test("ignored while result displayed", () => {
      const { add, equals, one } = keyPad;

      fireClickEvents([one, add, one, equals, equals]);
      expectDisplayTextContent(display, "1+1=", "2");
    });

    test("overwrites operator", () => {
      const { add, equals } = keyPad;

      fireClickEvents([add, equals]);
      expectDisplayTextContent(display, "0=", "0");
    });

    test("appends to expression and displays result", () => {
      const { add, equals, one } = keyPad;

      fireClickEvents([one, add, one, equals]);
      expectDisplayTextContent(display, "1+1=", "2");
    });
  });

  describe("operators", () => {
    test("starts new expression from a result", () => {
      const { add, equals, one } = keyPad;

      fireClickEvents([one, add, one, equals]);
      expectDisplayTextContent(display, "1+1=", "2");

      fireClickEvents([add]);
      expectDisplayTextContent(display, "2", "+");
    });

    test("overwrites operator", () => {
      const { multiply, add } = keyPad;

      fireClickEvents([multiply, add]);
      expectDisplayTextContent(display, "0", "+");
    });

    test("appends input to expression", () => {
      const { add, decimal } = keyPad;

      fireClickEvents([add, decimal, add]);
      expectDisplayTextContent(display, "0+0.", "+");
    });
  });

  describe("decimal", () => {
    test("only one per number", () => {
      const { decimal, one } = keyPad;

      fireClickEvents([one, decimal, decimal]);
      expectDisplayTextContent(display, "", "1.");
    });

    test("prepends decimal with zero", () => {
      const { add, equals, decimal } = keyPad;

      fireClickEvents([decimal, add, decimal]);
      expectDisplayTextContent(display, "0.+", "0.");

      fireClickEvents([equals, decimal]);
      expectDisplayTextContent(display, "", "0.");
    });
  });

  describe("digits", () => {
    test("limited to 10", () => {
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

    test("clears expression and overwrites result", () => {
      const { equals, one } = keyPad;

      fireClickEvents([equals]);
      expectDisplayTextContent(display, "0=", "0");

      fireClickEvents([one]);
      expectDisplayTextContent(display, "", "1");
    });

    test("overwrites operator", () => {
      const { add, one } = keyPad;

      fireClickEvents([add, one]);
      expectDisplayTextContent(display, "0+", "1");
    });

    test("overwrites leading zeros", () => {
      const { zero, one } = keyPad;

      fireClickEvents([zero, one]);
      expectDisplayTextContent(display, "", "1");
    });

    test("appends to digits and decimal", () => {
      const { decimal, one } = keyPad;

      fireClickEvents([decimal, one, one]);
      expectDisplayTextContent(display, "", "0.11");
    });
  });

  describe("negate", () => {
    test("prepends current input with '-' if positive", () => {
      const { add, negate, one } = keyPad;

      fireClickEvents([one, negate]);
      expectDisplayTextContent(display, "", "-1");

      fireClickEvents([add, one, negate]);
      expectDisplayTextContent(display, "-1+", "-1");
    });

    test("removes '-' from current input if negative", () => {
      const { add, negate, one } = keyPad;

      fireClickEvents([one, negate, negate]);
      expectDisplayTextContent(display, "", "1");

      fireClickEvents([add, one, negate, negate]);
      expectDisplayTextContent(display, "1+", "1");
    });

    test("does not negate zero", () => {
      const { negate } = keyPad;

      fireClickEvents([negate]);
      expectDisplayTextContent(display, "", "0");
    });

    test("does nothing after operator", () => {
      const { add, negate } = keyPad;

      fireClickEvents([add, negate]);
      expectDisplayTextContent(display, "0", "+");
    });

    test("keeps expression negates result", () => {
      const { negate, equals, one } = keyPad;

      fireClickEvents([one, equals, negate]);
      expectDisplayTextContent(display, "1=", "-1");
    });
  });

  describe("keyboard", () => {
    test("handles numpad keydown events", () => {
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
