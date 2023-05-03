import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class OperatorReducer implements Reducer {
  constructor(private calculator: Calculator) {}

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    const tag = symbol === "e" ? "0" : "";
    return {
      expression: state.expression + state.input,
      input: /[.e]/.test(symbol) ? "0" + symbol + tag : symbol,
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
