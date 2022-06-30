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

  function expectDisplayTextContent(expr: string, inpt: string) {
    expect(display.EXPRESSION).toHaveTextContent(expr);
    expect(display.INPUT).toHaveTextContent(inpt);
  }

  beforeEach(async () => {
    const { getByText, getAllByText } = await render(AppComponent, {
      imports: [AppModule],
    });
    const zeros = getAllByText("0");
    display = Object.freeze({
      EXPRESSION: zeros[0],
      INPUT: zeros[1],
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
      ZERO: zeros[2],
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
      expectDisplayTextContent("1+", "+");
    });

    test("does nothing after result", () => {
      const { DELETE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, DELETE]);
      expectDisplayTextContent("1=", "1");
    });

    test("overwrites current number input with zero", () => {
      const { DELETE, ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, DELETE]);
      expectDisplayTextContent("0", "0");

      fireClickEvents([ADD, ONE, DELETE]);
      expectDisplayTextContent("0+0", "0");

      fireClickEvents([ADD, ONE, NEGATE, DELETE]);
      expectDisplayTextContent("0+0+0", "0");
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
    test("overwrites expression and appends to result", () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent("1+1=", "2");

      fireClickEvents([ADD]);
      expectDisplayTextContent("2+", "+");
    });

    test("overwrites operator", () => {
      const { MULTIPLY, ADD } = keyPad;

      fireClickEvents([MULTIPLY, ADD]);
      expectDisplayTextContent("0+", "+");
    });

    test("appends to digits and decimal", () => {
      const { ADD, DECIMAL } = keyPad;

      fireClickEvents([ADD, DECIMAL, ADD]);
      expectDisplayTextContent("0+0.+", "+");
    });
  });

  describe("decimal", () => {
    test("only one per number", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([ONE, DECIMAL, DECIMAL]);
      expectDisplayTextContent("1.", "1.");
    });

    test("prepends decimal with zero", () => {
      const { ADD, EQUALS, DECIMAL } = keyPad;

      fireClickEvents([DECIMAL, ADD, DECIMAL]);
      expectDisplayTextContent("0.+0.", "0.");

      fireClickEvents([EQUALS, DECIMAL]);
      expectDisplayTextContent("0.", "0.");
    });
  });

  describe("digits", () => {
    test("limited to 10", () => {
      const { CLEAR, ADD, NEGATE, EQUALS, DECIMAL, ONE } = keyPad;
      const elevenOnes = new Array(11).fill(ONE);

      fireClickEvents(elevenOnes);
      expectDisplayTextContent("1111111111", "1111111111");

      fireClickEvents([CLEAR, ADD, ...elevenOnes, NEGATE]);
      expectDisplayTextContent("0+-1111111111", "-1111111111");

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes]);
      expectDisplayTextContent("0.111111111", "0.111111111");

      fireClickEvents([CLEAR, ADD, DECIMAL, ...elevenOnes, NEGATE]);
      expectDisplayTextContent("0+-0.111111111", "-0.111111111");

      fireClickEvents([EQUALS, ONE]);
      expectDisplayTextContent("1", "1");
    });

    test("overwrites expression and result", () => {
      const { EQUALS, ONE } = keyPad;

      fireClickEvents([EQUALS]);
      expectDisplayTextContent("0=", "0");

      fireClickEvents([ONE]);
      expectDisplayTextContent("1", "1");
    });

    test("appends to operator", () => {
      const { ADD, ONE } = keyPad;

      fireClickEvents([ADD, ONE]);
      expectDisplayTextContent("0+1", "1");
    });

    test("ignores leading zeros", () => {
      const { ZERO, ONE } = keyPad;

      fireClickEvents([ZERO, ONE]);
      expectDisplayTextContent("1", "1");
    });

    test("appends to digits and decimal", () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([DECIMAL, ONE, ONE]);
      expectDisplayTextContent("0.11", "0.11");
    });
  });

  describe("negate", () => {
    test("prepends current input with '-' if positive", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE]);
      expectDisplayTextContent("-1", "-1");

      fireClickEvents([ADD, ONE, NEGATE]);
      expectDisplayTextContent("-1+-1", "-1");
    });

    test("removes '-' from current input if negative", () => {
      const { ADD, NEGATE, ONE } = keyPad;

      fireClickEvents([ONE, NEGATE, NEGATE]);
      expectDisplayTextContent("1", "1");

      fireClickEvents([ADD, ONE, NEGATE, NEGATE]);
      expectDisplayTextContent("1+1", "1");
    });

    test("does not negate zero", () => {
      const { NEGATE } = keyPad;

      fireClickEvents([NEGATE]);
      expectDisplayTextContent("0", "0");
    });

    test("does nothing after operator", () => {
      const { ADD, NEGATE } = keyPad;

      fireClickEvents([ADD, NEGATE]);
      expectDisplayTextContent("0+", "+");
    });

    test("negates new expression after result", () => {
      const { NEGATE, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, EQUALS, NEGATE]);
      expectDisplayTextContent("-1", "-1");

      fireClickEvents([EQUALS, NEGATE, ONE]);
      expectDisplayTextContent("11", "11");
    });
  });
});
