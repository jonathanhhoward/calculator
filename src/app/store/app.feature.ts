import { createFeature, createReducer, on } from "@ngrx/store";
import { calculate } from "shared/lib/calculate";
import * as actions from "./app.actions";

export type Status = "input" | "operator" | "result";

export interface AppState {
  expression: string;
  input: string;
  status: Status;
}

const initialState: AppState = {
  expression: "0",
  input: "0",
  status: "input",
};

export const appFeature = createFeature({
  name: "app",
  reducer: createReducer(
    initialState,
    on(actions.clearClick, clearClickReducer),
    on(actions.deleteClick, deleteClickReducer),
    on(actions.digitClick, digitClickReducer),
    on(actions.operatorClick, operatorClickReducer),
    on(actions.negateClick, negateClickReducer),
    on(actions.equalsClick, equalsClickReducer)
  ),
});

export const { selectAppState } = appFeature;

function clearClickReducer(): AppState {
  return initialState;
}

function deleteClickReducer(state: AppState): AppState {
  switch (state.status) {
    case "input":
      return {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + "0",
        input: "0",
      };
    default:
      return state;
  }
}

function digitClickReducer(
  state: AppState,
  { symbol }: actions.Payload
): AppState {
  if (isMaxDigits()) return state;

  if (symbol === ".") {
    if (hasDecimal()) return state;

    if (isLeadingZero()) symbol = "0.";
  }

  switch (state.status) {
    case "input":
      return state.input === "0"
        ? {
            expression: state.expression.slice(0, -1) + symbol,
            input: symbol,
            status: "input",
          }
        : {
            expression: state.expression + symbol,
            input: state.input + symbol,
            status: "input",
          };
    case "operator":
      return {
        expression: state.expression + symbol,
        input: symbol,
        status: "input",
      };
    case "result":
      return {
        expression: symbol,
        input: symbol,
        status: "input",
      };
    default:
      return state;
  }

  function isMaxDigits() {
    return (
      state.input.replace(/[.-]/g, "").length === 10 &&
      state.status !== "result"
    );
  }

  function hasDecimal() {
    return state.input.includes(".") && state.status !== "result";
  }

  function isLeadingZero() {
    return state.input === "0" || state.status !== "input";
  }
}

function operatorClickReducer(
  state: AppState,
  { symbol }: actions.Payload
): AppState {
  switch (state.status) {
    case "input":
      return {
        expression: state.expression + symbol,
        input: symbol,
        status: "operator",
      };
    case "operator":
      return {
        expression: state.expression.slice(0, -1) + symbol,
        input: symbol,
        status: "operator",
      };
    case "result":
      return {
        expression: state.input + symbol,
        input: symbol,
        status: "operator",
      };
    default:
      return state;
  }
}

function negateClickReducer(state: AppState): AppState {
  let input: string;

  switch (state.status) {
    case "input":
      input = negateInput();
      return {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + input,
        input,
      };
    case "result":
      input = negateInput();
      return {
        expression: input,
        input,
        status: "input",
      };
    default:
      return state;
  }

  function negateInput() {
    return (-Number(state.input)).toString();
  }
}

function equalsClickReducer(state: AppState): AppState {
  let expression: string;

  switch (state.status) {
    case "input":
      expression = normalizeOperators(state.expression);
      return {
        expression: state.expression + "=",
        input: calculate(expression),
        status: "result",
      };
    case "operator":
      expression = normalizeOperators(state.expression.slice(0, -1));
      return {
        expression: state.expression.slice(0, -1) + "=",
        input: calculate(expression),
        status: "result",
      };
    default:
      return state;
  }

  function normalizeOperators(expression: string): string {
    return expression.replace(/−/, "-").replace(/×/, "*").replace(/÷/, "/");
  }
}
