import { Injectable } from "@angular/core";
import { Calculator } from "../calculator/calculator";
import { FloatingPoint } from "../models/floating-point";
import { Digit, Operator } from "../models/types";
import { Reducer } from "../state/reducer";
import { State } from "../state/state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements Reducer {
  readonly #calculator: Calculator;

  constructor(calculator: Calculator) {
    this.#calculator = calculator;
  }

  deleteClick(state: State): State {
    return state;
  }

  digitClick(_: State, symbol: Digit): State {
    return {
      expression: "",
      input: new FloatingPoint("0").append(symbol),
    };
  }

  operatorClick(state: State, symbol: Operator): State {
    return {
      expression: `${state.input}`,
      input: symbol,
    };
  }

  negateClick(state: State): State {
    return {
      ...state,
      input: this.#calculator.negate(state.input as FloatingPoint),
    };
  }

  equalsClick(state: State): State {
    return state;
  }
}
