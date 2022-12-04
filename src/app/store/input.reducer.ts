import { AppReducer } from "app/store/app.reducer";
import { OperatorReducer } from "app/store/operator.reducer";
import { ResultReducer } from "app/store/result.reducer";
import { calculate } from "lib/calculate";
import { Payload } from "./app.actions";
import { AppState } from "./app.feature";

export class InputReducer extends AppReducer {
  deleteClick(state: AppState): AppState {
    return {
      expression: state.expression,
      input: "0",
      reducer: this,
    };
  }

  digitClick(state: AppState, { symbol }: Payload): AppState {
    const inputHasMaxDigits = state.input.replace(/[.-]/g, "").length === 10;
    const symbolIsDecimal = symbol === ".";
    const inputHasDecimal = state.input.includes(".");
    const inputIsZero = state.input === "0";

    if (inputHasMaxDigits) return state;

    if (symbolIsDecimal) {
      if (inputHasDecimal) return state;

      if (inputIsZero) symbol = "0.";
    }

    return inputIsZero
      ? {
          expression: state.expression,
          input: symbol,
          reducer: this,
        }
      : {
          expression: state.expression,
          input: state.input + symbol,
          reducer: this,
        };
  }

  operatorClick(state: AppState, { symbol }: Payload): AppState {
    return {
      expression: state.expression + state.input,
      input: symbol,
      reducer: new OperatorReducer(),
    };
  }

  negateClick(state: AppState): AppState {
    return {
      expression: state.expression,
      input: (-Number(state.input)).toString(),
      reducer: this,
    };
  }

  equalsClick(state: AppState): AppState {
    const expression = (state.expression + state.input)
      .replace(/−/, "-")
      .replace(/×/, "*")
      .replace(/÷/, "/");

    return {
      expression: state.expression + state.input + "=",
      input: calculate(expression),
      reducer: new ResultReducer(),
    };
  }
}
