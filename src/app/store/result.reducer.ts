import { AppReducer } from "app/store/app.reducer";
import { InputReducer } from "app/store/input.reducer";
import { OperatorReducer } from "app/store/operator.reducer";
import { Payload } from "./app.actions";
import { AppState } from "./app.feature";

export class ResultReducer extends AppReducer {
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
      expression: state.input + symbol,
      input: symbol,
      reducer: new OperatorReducer(),
    };
  }

  negateClick(state: AppState): AppState {
    const input = (-Number(state.input)).toString();

    return {
      expression: input,
      input,
      reducer: new InputReducer(),
    };
  }

  equalsClick(state: AppState): AppState {
    return state;
  }
}
