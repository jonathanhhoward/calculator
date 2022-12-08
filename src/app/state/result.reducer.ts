import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";

@Injectable({ providedIn: "root" })
export class ResultReducer implements AppReducer {
  deleteClick(state: AppState): AppState {
    return state;
  }

  digitClick(state: AppState, symbol: string): AppState {
    return {
      expression: "",
      input: symbol === "." ? "0." : symbol,
      inputMode: "input",
    };
  }

  operatorClick(state: AppState, symbol: string): AppState {
    return {
      expression: state.input,
      input: symbol,
      inputMode: "operator",
    };
  }

  negateClick(state: AppState): AppState {
    return {
      expression: "",
      input: (-Number(state.input)).toString(),
      inputMode: "input",
    };
  }

  equalsClick(state: AppState): AppState {
    return state;
  }
}
