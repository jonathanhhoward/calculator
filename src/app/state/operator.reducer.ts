import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { FloatingPoint } from "app/models/floating-point";
import { Digit } from "app/models/types";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class OperatorReducer implements Reducer {
  constructor(private calculator: Calculator) {}

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    return {
      expression: state.expression + state.input,
      input: new FloatingPoint("0").append(symbol as Digit).value,
    };
  }

  operatorClick(state: State, symbol: string): State {
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
      input: this.calculator.eval(state.expression),
    };
  }
}
