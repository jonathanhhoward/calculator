import { AppReducer } from "app/store/app.reducer";
import { InputReducer } from "app/store/input.reducer";
import { ResultReducer } from "app/store/result.reducer";
import { calculate } from "lib/calculate";
import { Payload } from "./app.actions";
import { AppState } from "./app.feature";

export class OperatorReducer extends AppReducer {
  deleteClick(state: AppState): AppState {
    return state;
  }

  digitClick(state: AppState, { symbol }: Payload): AppState {
    if (symbol === ".") symbol = "0.";

    return {
      expression: state.expression + symbol,
      input: symbol,
      reducer: new InputReducer(),
    };
  }

  operatorClick(state: AppState, { symbol }: Payload): AppState {
    return {
      expression: state.expression.slice(0, -1) + symbol,
      input: symbol,
      reducer: this,
    };
  }

  negateClick(state: AppState): AppState {
    return state;
  }

  equalsClick(state: AppState): AppState {
    const expression = state.expression
      .slice(0, -1)
      .replace(/−/, "-")
      .replace(/×/, "*")
      .replace(/÷/, "/");

    return {
      expression: state.expression.slice(0, -1) + "=",
      input: calculate(expression),
      reducer: new ResultReducer(),
    };
  }
}
