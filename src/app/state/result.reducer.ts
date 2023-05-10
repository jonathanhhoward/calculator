import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements Reducer {
  constructor(private calculator: Calculator) {}

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: Digit): State {
    return {
      expression: "",
      input: new FloatingPoint().append(symbol),
    };
  }

  operatorClick(state: State, symbol: Operator): State {
    return {
      expression: (<FloatingPoint>state.input).value,
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
