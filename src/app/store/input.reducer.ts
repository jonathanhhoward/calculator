import { AppReducer } from "app/store/app.reducer";
import { OperatorReducer } from "app/store/operator.reducer";
import { ResultReducer } from "app/store/result.reducer";
import { calculate } from "lib/calculate";
import { Payload } from "./app.actions";
import { AppState } from "./app.feature";

export class InputReducer extends AppReducer {
  deleteClick(state: AppState): AppState {
    return {
      ...state,
      input: "0",
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

    return {
      ...state,
      input: inputIsZero ? symbol : state.input + symbol,
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
      ...state,
      input: (-Number(state.input)).toString(),
    };
  }

  equalsClick(state: AppState): AppState {
    return {
      expression: state.expression + state.input + "=",
      input: calculate(state.expression + state.input),
      reducer: new ResultReducer(),
    };
  }
}
