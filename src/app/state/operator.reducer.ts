import { calculate } from "app/calculate";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

export class OperatorReducer implements Reducer {
  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    return {
      expression: state.expression + state.input,
      input: symbol === "." ? "0." : symbol,
    };
  }

  operatorClick(state: State, symbol: string): State {
    return {
      ...state,
      input: symbol,
    };
  }

  negateClick(state: State): State {
    return state;
  }

  equalsClick(state: State): State {
    return {
      expression: state.expression + "=",
      input: calculate(state.expression),
    };
  }
}
