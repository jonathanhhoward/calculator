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
    if (guard()) return state;

    return {
      ...state,
      input: isOverwriteZero() ? symbol : state.input + symbol,
    };

    function guard() {
      const [mantissa, exponent] = state.input.split("e");
      const mantissaHasTenDigits = mantissa.replace(/[.-]/g, "").length === 10;
      const exponentHasTwoDigits = exponent
        ? exponent.replace(/-/g, "").length === 2
        : null;
      const inputHasMaxDigits =
        exponent != null
          ? exponentHasTwoDigits
          : mantissaHasTenDigits && symbol !== "e";
      const isDuplicateDecimal = symbol === "." && state.input.includes(".");
      const isDuplicateExponent = symbol === "e" && state.input.includes("e");
      const isDecimalOnExponent = symbol === "." && state.input.includes("e");

      return (
        inputHasMaxDigits ||
        isDuplicateDecimal ||
        isDuplicateExponent ||
        isDecimalOnExponent
      );
    }

    function isOverwriteZero() {
      return state.input === "0" && symbol !== "." && symbol !== "e";
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
