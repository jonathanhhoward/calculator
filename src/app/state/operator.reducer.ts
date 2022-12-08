import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { calculate } from "lib/calculate";

@Injectable({ providedIn: "root" })
export class OperatorReducer implements AppReducer {
  deleteClick(state: AppState): AppState {
    return state;
  }

  digitClick(state: AppState, symbol: string): AppState {
    return {
      expression: state.expression + state.input,
      input: symbol === "." ? "0." : symbol,
      inputMode: "input",
    };
  }

  operatorClick(state: AppState, symbol: string): AppState {
    return {
      ...state,
      input: symbol,
    };
  }

  negateClick(state: AppState): AppState {
    return state;
  }

  equalsClick(state: AppState): AppState {
    return {
      expression: state.expression + "=",
      input: calculate(state.expression),
      inputMode: "result",
    };
  }
}
