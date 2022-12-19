import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { calculate } from "lib/calculate";

@Injectable({ providedIn: "root" })
export class NumberReducer implements AppReducer {
  deleteClick(state: AppState): AppState {
    return {
      ...state,
      input: "0",
    };
  }

  digitClick(state: AppState, symbol: string): AppState {
    if (guard()) return state;

    return {
      ...state,
      input: isOverwriteZero() ? symbol : state.input + symbol,
    };

    function guard() {
      const inputHasMaxDigits = state.input.replace(/[.-]/g, "").length === 10;
      const inputHasDecimal = state.input.includes(".");
      const symbolIsDecimal = symbol === ".";

      return inputHasMaxDigits || (symbolIsDecimal && inputHasDecimal);
    }

    function isOverwriteZero() {
      return state.input === "0" && !(symbol === ".");
    }
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
