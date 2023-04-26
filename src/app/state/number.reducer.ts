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
        /[.e]/.test(symbol) || exponent.replace(/-/, "").length === 2;

      input = isIgnoreSymbol ? state.input : state.input + symbol;
    } else {
      const isOverwriteZero = mantissa === "0" && !/[.e]/.test(symbol);
      const isIgnoreSymbol =
        (symbol === "." && mantissa.includes(".")) ||
        (symbol !== "e" && mantissa.replace(/[.-]/, "").length === 10);

      input = isIgnoreSymbol
        ? state.input
        : isOverwriteZero
        ? symbol
        : state.input + symbol;
    }

    return {
      ...state,
      input,
    };
  }

  operatorClick(state: State, symbol: string): State {
    const tag = /[.e]/.test(state.input.slice(-1)) ? "0" : "";
    return {
      expression: state.expression + state.input + tag,
      input: symbol,
    };
  }

  negateClick(state: State): State {
    const [mantissa, exponent] = state.input.split("e");
    return state.input.endsWith("e")
      ? state
      : {
          ...state,
          input:
            exponent !== undefined
              ? `${mantissa}e${-exponent}`
              : `${-mantissa}`,
        };
  }

  equalsClick(state: State): State {
    const tag = /[.e]/.test(state.input.slice(-1)) ? "0=" : "=";
    return {
      expression: state.expression + state.input + tag,
      input: calculate(state.expression + state.input),
    };
  }
}
