import { calculate } from "app/calculate";
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
    const [mantissa, exponent] = state.input.split("e");
    let input: string;

    if (exponent !== undefined) {
      const isIgnoreSymbol =
        symbol === "e" ||
        symbol === "." ||
        exponent.replace(/-/g, "").length === 2;

      input = isIgnoreSymbol ? state.input : state.input + symbol;
    } else {
      const isOverwriteZero = mantissa === "0" && symbol !== ".";
      const isIgnoreSymbol =
        (symbol === "." && mantissa.includes(".")) ||
        (symbol !== "e" && mantissa.replace(/[.-]/g, "").length === 10);

      input = isIgnoreSymbol
        ? state.input
        : isOverwriteZero
        ? symbol
        : state.input + symbol;
    }

    return { ...state, input };
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
