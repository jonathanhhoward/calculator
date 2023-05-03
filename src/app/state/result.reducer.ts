import { Injectable } from "@angular/core";
import { Calculator } from "app/calculator/calculator";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements Reducer {
  constructor(private calculator: Calculator) {}

  deleteClick(state: State): State {
    return state;
  }

  digitClick(state: State, symbol: string): State {
    const tag = symbol === "e" ? "0" : "";
    return {
      expression: "",
      input: /[.e]/.test(symbol) ? "0" + symbol + tag : symbol,
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
