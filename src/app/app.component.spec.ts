/* eslint-disable jest/expect-expect */
import { fireEvent } from "@testing-library/angular";
import "@testing-library/jest-dom/extend-expect";
import testSetup from "app/test-utils/test-setup";

function fireClickEvents(nodes: Node[]) {
  nodes.forEach((node) => fireEvent.click(node));
}

function fireKeydownEvents(codes: string[]) {
  codes.forEach((code) => fireEvent.keyDown(document.body, { code }));
}

function expectDisplayTextContent(
  display: Record<string, HTMLElement>,
  expression: string,
  input: string
) {
  const { EXPRESSION, INPUT } = display;

  expect(EXPRESSION.textContent).toBe(expression);
  expect(INPUT.textContent).toBe(input);
}

describe("display on key click", () => {
  let display: Record<string, HTMLElement>;
  let keyPad: Record<string, HTMLElement>;

  beforeEach(async () => {
    const setup = await testSetup();
    display = setup.display;
    keyPad = setup.keyPad;
  });

  describe("delete", () => {
    test("does nothing after operator", () => {
      const { DELETE, ADD, ONE } = keyPad;

      fireClickEvents([ONE, ADD, DELETE]);
      expectDisplayTextContent(display, "1", "+");
    });

    test("does nothing after result", () => {
      const { DELETE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, DELETE]);
      expectDisplayTextContent(display, "1=", "1");
    });

    test("overwrites current number input with zero", () => {
      const { DELETE, ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, DELETE]);
      expectDisplayTextContent(display, "", "0");

      fireClickEvents([ADD, ONE, DELETE]);
      expectDisplayTextContent(display, "0+", "0");

      fireClickEvents([ADD, ONE, NEGATE, DELETE]);
      expectDisplayTextContent(display, "0+0+", "0");
    });
  });

  describe("equals", () => {
    test("ignored while result displayed", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS, EQUALS]);
      expectDisplayTextContent(display, "1+1=", "2");
    });

    test("overwrites operator", () => {
      const { ADD, EQUALS } = keyPad;

      fireClickEvents([ADD, EQUALS]);
      expectDisplayTextContent(display, "0=", "0");
    });

    test("appends to expression and displays result", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent(display, "1+1=", "2");
    });
  });

  describe("operators", () => {
    test("starts new expression from a result", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent(display, "1+1=", "2");

      fireClickEvents([ADD]);
      expectDisplayTextContent(display, "2", "+");
    });

    test("overwrites operator", () => {
      const { MULTIPLY, ADD } = keyPad;

      fireClickEvents([MULTIPLY, ADD]);
      expectDisplayTextContent(display, "0", "+");
    });

    test("appends input to expression", () => {
      const { ADD, DECIMAL } = keyPad;

      fireClickEvents([ADD, DECIMAL, ADD]);
      expectDisplayTextContent(display, "0+0.", "+");
    });
  });

  describe("decimal", () => {
    test("only one per number", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([ONE, DECIMAL, DECIMAL]);
      expectDisplayTextContent(display, "", "1.");
    });

    test("prepends decimal with zero", () => {
      const { ADD, EQUALS, DECIMAL } = keyPad;

      fireClickEvents([DECIMAL, ADD, DECIMAL]);
      expectDisplayTextContent(display, "0.+", "0.");

      fireClickEvents([EQUALS, DECIMAL]);
      expectDisplayTextContent(display, "", "0.");
    });
  });

  describe("digits", () => {
    test("limited to 10", () => {
      const { CLEAR, ADD, NEGATE, EQUALS, DECIMAL, ONE } = keyPad;
      const elevenOnes = new Array(11).fill(ONE);

      fireClickEvents(elevenOnes);
      expectDisplayTextContent(display, "", "1111111111");

      fireClickEvents([CLEAR, ADD, ...elevenOnes, NEGATE]);
      expectDisplayTextContent(display, "0+", "-1111111111");

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes]);
      expectDisplayTextContent(display, "", "0.111111111");

      fireClickEvents([CLEAR, ADD, DECIMAL, ...elevenOnes, NEGATE]);
      expectDisplayTextContent(display, "0+", "-0.111111111");

      fireClickEvents([EQUALS, ONE]);
      expectDisplayTextContent(display, "", "1");
    });

    test("clears expression and overwrites result", () => {
      const { EQUALS, ONE } = keyPad;

      fireClickEvents([EQUALS]);
      expectDisplayTextContent(display, "0=", "0");

      fireClickEvents([ONE]);
      expectDisplayTextContent(display, "", "1");
    });

    test("overwrites operator", () => {
      const { ADD, ONE } = keyPad;

      fireClickEvents([ADD, ONE]);
      expectDisplayTextContent(display, "0+", "1");
    });

    test("overwrites leading zeros", () => {
      const { ZERO, ONE } = keyPad;

      fireClickEvents([ZERO, ONE]);
      expectDisplayTextContent(display, "", "1");
    });

    test("appends to digits and decimal", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([DECIMAL, ONE, ONE]);
      expectDisplayTextContent(display, "", "0.11");
    });
  });

  describe("negate", () => {
    test("prepends current input with '-' if positive", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE]);
      expectDisplayTextContent(display, "", "-1");

      fireClickEvents([ADD, ONE, NEGATE]);
      expectDisplayTextContent(display, "-1+", "-1");
    });

    test("removes '-' from current input if negative", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE, NEGATE]);
      expectDisplayTextContent(display, "", "1");

      fireClickEvents([ADD, ONE, NEGATE, NEGATE]);
      expectDisplayTextContent(display, "1+", "1");
    });

    test("does not negate zero", () => {
      const { NEGATE } = keyPad;

      fireClickEvents([NEGATE]);
      expectDisplayTextContent(display, "", "0");
    });

    test("does nothing after operator", () => {
      const { ADD, NEGATE } = keyPad;

      fireClickEvents([ADD, NEGATE]);
      expectDisplayTextContent(display, "0", "+");
    });

    test("keeps expression negates result", () => {
      const { NEGATE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, NEGATE]);
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
