import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

export class ResultReducer implements Reducer {
  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    return {
      expression: "",
      input: symbol === "." ? "0." : symbol,
    };
  }

  operatorClick(state: State, symbol: string): State {
    return {
      expression: state.input,
      input: symbol,
    };
  }

  negateClick(state: State): State {
    return {
      ...state,
      input: (-Number(state.input)).toString(),
    };
  }

  equalsClick(state: State): State {
    return state;
  }
}
