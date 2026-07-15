import { Injectable } from "@angular/core";
import { Calculator } from "../calculator/calculator";
import { FloatingPoint } from "../models/floating-point";
import { Digit, Operator } from "../models/types";
import { Reducer } from "../state/reducer";
import { State } from "../state/state";

@Injectable({ providedIn: "root" })
export class OperatorReducer implements Reducer {
  readonly #calculator: Calculator;

  constructor(calculator: Calculator) {
    this.#calculator = calculator;
  }

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: Digit): State {
    return {
      expression: state.expression + state.input,
      input: new FloatingPoint("0").append(symbol),
    };
  }

  operatorClick(state: State, symbol: Operator): State {
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
      input: this.#calculator.eval(state.expression),
    };
  }
}
