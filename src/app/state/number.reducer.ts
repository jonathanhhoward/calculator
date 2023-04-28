import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class NumberReducer implements Reducer {
  constructor(private calculator: Calculator) {}

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
      const fill = symbol === "e" && mantissa.endsWith(".") ? "0" : "";

      input = isIgnoreSymbol
        ? state.input
        : isOverwriteZero
        ? symbol
        : state.input + fill + symbol;
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
    const tag = /[.e]/.test(state.input.slice(-1)) ? "0" : "";
    const expression = state.expression + state.input + tag;
    return {
      expression: expression + "=",
      input: this.calculator.eval(expression),
    };
  }
}
