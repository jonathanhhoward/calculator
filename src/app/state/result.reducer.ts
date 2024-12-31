import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements Reducer {
  private calculator: Calculator;

  constructor(calculator: Calculator) {
    this.calculator = calculator;
  }

  deleteClick(state: State): State {
    return state;
  }

  digitClick(_: State, symbol: Digit): State {
    return {
      expression: "",
      input: FloatingPoint.from("0").append(symbol),
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
      input: this.calculator.negate(<FloatingPoint>state.input),
    };
  }

  equalsClick(state: State): State {
    return state;
  }
}
