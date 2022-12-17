/* eslint-disable jest/expect-expect */
import { fireEvent, render } from "@testing-library/angular";
import "@testing-library/jest-dom/extend-expect";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe("display on key click", () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let display: any;
  let keyPad: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  function fireClickEvents(nodes: Node[]) {
    nodes.forEach((node) => fireEvent.click(node));
  }

  function fireKeydownEvents(codes: string[]) {
    codes.forEach((code) => fireEvent.keyDown(document.body, { code }));
  }

  function expectDisplayTextContent(expr: string, input: string) {
    expect(display.EXPRESSION.textContent).toBe(expr);
    expect(display.INPUT.textContent).toBe(input);
  }

  beforeEach(async () => {
    const { getByText, getAllByText, getByTestId } = await render(
      AppComponent,
      {
        imports: [AppModule],
      }
    );
    const zeros = getAllByText("0");
    display = Object.freeze({
      EXPRESSION: getByTestId("expression"),
      INPUT: zeros[0],
    });
    keyPad = Object.freeze({
      CLEAR: getByText("AC"),
      DELETE: getByText("C"),
      DIVIDE: getByText("÷"),
      MULTIPLY: getByText("×"),
      SUBTRACT: getByText("−"),
      ADD: getByText("+"),
      NEGATE: getByText("+/-"),
      EQUALS: getByText("="),
      DECIMAL: getByText("."),
      ZERO: zeros[1],
      ONE: getByText("1"),
      TWO: getByText("2"),
      THREE: getByText("3"),
      FOUR: getByText("4"),
      FIVE: getByText("5"),
      SIX: getByText("6"),
      SEVEN: getByText("7"),
      EIGHT: getByText("8"),
      NINE: getByText("9"),
    });
  });

  describe("delete", () => {
    test("does nothing after operator", () => {
      const { DELETE, ADD, ONE } = keyPad;

      fireClickEvents([ONE, ADD, DELETE]);
      expectDisplayTextContent("1", "+");
    });

    test("does nothing after result", () => {
      const { DELETE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, DELETE]);
      expectDisplayTextContent("1=", "1");
    });

    test("overwrites current number input with zero", () => {
      const { DELETE, ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, DELETE]);
      expectDisplayTextContent("", "0");

      fireClickEvents([ADD, ONE, DELETE]);
      expectDisplayTextContent("0+", "0");

      fireClickEvents([ADD, ONE, NEGATE, DELETE]);
      expectDisplayTextContent("0+0+", "0");
    });
  });

  describe("equals", () => {
    test("ignored while result displayed", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS, EQUALS]);
      expectDisplayTextContent("1+1=", "2");
    });

    test("overwrites operator", () => {
      const { ADD, EQUALS } = keyPad;

      fireClickEvents([ADD, EQUALS]);
      expectDisplayTextContent("0=", "0");
    });

    test("appends to expression and displays result", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent("1+1=", "2");
    });
  });

  describe("operators", () => {
    test("starts new expression from a result", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent("1+1=", "2");

      fireClickEvents([ADD]);
      expectDisplayTextContent("2", "+");
    });

    test("overwrites operator", () => {
      const { MULTIPLY, ADD } = keyPad;

      fireClickEvents([MULTIPLY, ADD]);
      expectDisplayTextContent("0", "+");
    });

    test("appends input to expression", () => {
      const { ADD, DECIMAL } = keyPad;

      fireClickEvents([ADD, DECIMAL, ADD]);
      expectDisplayTextContent("0+0.", "+");
    });
  });

  describe("decimal", () => {
    test("only one per number", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([ONE, DECIMAL, DECIMAL]);
      expectDisplayTextContent("", "1.");
    });

    test("prepends decimal with zero", () => {
      const { ADD, EQUALS, DECIMAL } = keyPad;

      fireClickEvents([DECIMAL, ADD, DECIMAL]);
      expectDisplayTextContent("0.+", "0.");

      fireClickEvents([EQUALS, DECIMAL]);
      expectDisplayTextContent("", "0.");
    });
  });

  describe("digits", () => {
    test("limited to 10", () => {
      const { CLEAR, ADD, NEGATE, EQUALS, DECIMAL, ONE } = keyPad;
      const elevenOnes = new Array(11).fill(ONE);

      fireClickEvents(elevenOnes);
      expectDisplayTextContent("", "1111111111");

      fireClickEvents([CLEAR, ADD, ...elevenOnes, NEGATE]);
      expectDisplayTextContent("0+", "-1111111111");

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes]);
      expectDisplayTextContent("", "0.111111111");

      fireClickEvents([CLEAR, ADD, DECIMAL, ...elevenOnes, NEGATE]);
      expectDisplayTextContent("0+", "-0.111111111");

      fireClickEvents([EQUALS, ONE]);
      expectDisplayTextContent("", "1");
    });

    test("clears expression and overwrites result", () => {
      const { EQUALS, ONE } = keyPad;

      fireClickEvents([EQUALS]);
      expectDisplayTextContent("0=", "0");

      fireClickEvents([ONE]);
      expectDisplayTextContent("", "1");
    });

    test("overwrites operator", () => {
      const { ADD, ONE } = keyPad;

      fireClickEvents([ADD, ONE]);
      expectDisplayTextContent("0+", "1");
    });

    test("overwrites leading zeros", () => {
      const { ZERO, ONE } = keyPad;

      fireClickEvents([ZERO, ONE]);
      expectDisplayTextContent("", "1");
    });

    test("appends to digits and decimal", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([DECIMAL, ONE, ONE]);
      expectDisplayTextContent("", "0.11");
    });
  });

  describe("negate", () => {
    test("prepends current input with '-' if positive", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE]);
      expectDisplayTextContent("", "-1");

      fireClickEvents([ADD, ONE, NEGATE]);
      expectDisplayTextContent("-1+", "-1");
    });

    test("removes '-' from current input if negative", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE, NEGATE]);
      expectDisplayTextContent("", "1");

      fireClickEvents([ADD, ONE, NEGATE, NEGATE]);
      expectDisplayTextContent("1+", "1");
    });

    test("does not negate zero", () => {
      const { NEGATE } = keyPad;

      fireClickEvents([NEGATE]);
      expectDisplayTextContent("", "0");
    });

    test("does nothing after operator", () => {
      const { ADD, NEGATE } = keyPad;

      fireClickEvents([ADD, NEGATE]);
      expectDisplayTextContent("0", "+");
    });

    test("keeps expression negates result", () => {
      const { NEGATE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, NEGATE]);
      expectDisplayTextContent("1=", "-1");
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

      expectDisplayTextContent("1.0+23−45×67÷89=", "-9.876404494");
    });
  });
});
