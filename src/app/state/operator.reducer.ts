import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class OperatorReducer implements Reducer {
  #calculator: Calculator;

  constructor(calculator: Calculator) {
    this.#calculator = calculator;
  }

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: Digit): State {
    return {
      expression: state.expression + state.input,
      input: FloatingPoint.from("0").append(symbol),
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
