import { render } from "@testing-library/angular";
import { Display, KeyPad } from "app/__tests__/test-utils/types";
import { AppComponent } from "app/app.component";

export default async function () {
  const { getByText, getAllByText, getByTestId } = await render(AppComponent);
  const zeros = getAllByText("0");
  const display: Display = {
    expression: getByTestId("expression"),
    input: zeros[0],
  };
  const keyPad: KeyPad = {
    clear: getByText("AC"),
    del: getByText("C"),
    divide: getByText("÷"),
    multiply: getByText("×"),
    subtract: getByText("−"),
    add: getByText("+"),
    negate: getByText("+/-"),
    equals: getByText("="),
    exponent: getByText("e"),
    decimal: getByText("."),
    zero: zeros[1],
    one: getByText("1"),
    two: getByText("2"),
    three: getByText("3"),
    four: getByText("4"),
    five: getByText("5"),
    six: getByText("6"),
    seven: getByText("7"),
    eight: getByText("8"),
    nine: getByText("9"),
  };

  return { display, keyPad };
}
