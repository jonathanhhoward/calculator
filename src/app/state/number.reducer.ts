import { calculate } from "app/state/calculate";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

export class NumberReducer implements Reducer {
  deleteClick(state: State): State {
    return {
      ...state,
      input: "0",
    };
  }

  digitClick(state: State, symbol: string): State {
    if (guard()) return state;

    return {
      ...state,
      input: isOverwriteZero() ? symbol : state.input + symbol,
    };

    function guard() {
      const inputHasMaxDigits = state.input.replace(/[.-]/g, "").length === 10;
      const inputHasDecimal = state.input.includes(".");
      const symbolIsDecimal = symbol === ".";

      return inputHasMaxDigits || (symbolIsDecimal && inputHasDecimal);
    }

    function isOverwriteZero() {
      return state.input === "0" && symbol !== ".";
    }
  }

  operatorClick(state: State, symbol: string): State {
    return {
      expression: state.expression + state.input,
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
    return {
      expression: state.expression + state.input + "=",
      input: calculate(state.expression + state.input),
    };
  }
}
