import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { Digit, FloatingPoint } from "app/models/floating-point";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements Reducer {
  constructor(private calculator: Calculator) {}

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    return {
      expression: "",
      input: new FloatingPoint("0").append(symbol as Digit).value,
    };
  }

  operatorClick(state: State, symbol: string): State {
    return {
      expression: state.input,
      input: symbol,
    };
  }

  negateClick(state: State): State {
    return {
      ...state,
      input: this.calculator.eval(`-${state.input}`),
    };
  }

  equalsClick(state: State): State {
    return state;
  }
}
