import { render } from "@testing-library/angular";
import { AppComponent } from "app/app.component";
import { AppModule } from "app/app.module";

export default async function () {
  const { getByText, getAllByText, getByTestId } = await render(AppComponent, {
    imports: [AppModule],
  });
  const zeros = getAllByText("0");
  const display = {
    EXPRESSION: getByTestId("expression"),
    INPUT: zeros[0],
  };
  const keyPad = {
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
  };

  return { display, keyPad };
}
