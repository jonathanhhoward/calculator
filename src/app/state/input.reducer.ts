import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { calculate } from "lib/calculate";

@Injectable({ providedIn: "root" })
export class InputReducer implements AppReducer {
  deleteClick(state: AppState): AppState {
    return {
      ...state,
      input: "0",
    };
  }

  digitClick(state: AppState, symbol: string): AppState {
    const inputHasMaxDigits = state.input.replace(/[.-]/g, "").length === 10;
    const symbolIsDecimal = symbol === ".";
    const inputHasDecimal = state.input.includes(".");
    const inputIsZero = state.input === "0";

    if (inputHasMaxDigits) return state;

    if (symbolIsDecimal) {
      if (inputHasDecimal) return state;

      if (inputIsZero) symbol = "0.";
    }

    return {
      ...state,
      input: inputIsZero ? symbol : state.input + symbol,
    };
  }

  operatorClick(state: AppState, symbol: string): AppState {
    return {
      expression: state.expression + state.input,
      input: symbol,
    };
  }

  negateClick(state: AppState): AppState {
    return {
      ...state,
      input: (-Number(state.input)).toString(),
    };
  }

  equalsClick(state: AppState): AppState {
    return {
      expression: state.expression + state.input + "=",
      input: calculate(state.expression + state.input),
    };
  }
}
