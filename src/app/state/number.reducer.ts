import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { Digit, FloatingPoint } from "app/models/floating-point";
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
    return {
      ...state,
      input: new FloatingPoint(state.input).append(symbol as Digit).value,
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
    return {
      ...state,
      input:
        exponent !== undefined ? `${mantissa}e${-exponent}` : `${-mantissa}`,
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
