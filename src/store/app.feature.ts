import { createFeature, createReducer, on } from "@ngrx/store";
import { calculate } from "lib/calculate";
import * as actions from "./app.actions";

export type Status = "input" | "operator" | "negative" | "result";

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
  if (state.status !== "input") return state;

  return {
    ...state,
    expression: state.expression.slice(0, -state.input.length) + "0",
    input: "0",
  };
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
    case "negative":
      return {
        expression: state.expression + symbol,
        input: state.input + symbol,
        status: "input",
      };
    case "result":
      return {
        expression: symbol,
        input: symbol,
        status: "input",
      };
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
  const MINUS = "−"; // &minus;
  const NEGATIVE = "-"; // &dash;

  switch (state.status) {
    case "input":
      return {
        expression: state.expression + symbol,
        input: symbol,
        status: "operator",
      };
    case "operator":
      return symbol === MINUS
        ? {
            expression: state.expression + NEGATIVE,
            input: NEGATIVE,
            status: "negative",
          }
        : {
            expression: state.expression.slice(0, -1) + symbol,
            input: symbol,
            status: "operator",
          };
    case "negative":
      return {
        expression: state.expression.slice(0, -2) + symbol,
        input: symbol,
        status: "operator",
      };
    case "result":
      return {
        expression: state.input + symbol,
        input: symbol,
        status: "operator",
      };
  }
}

function negateClickReducer(state: AppState): AppState {
  if (state.status === "operator") return state;

  const negated = (Number(state.input) * -1).toString();

  switch (state.status) {
    case "input":
      return {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + negated,
        input: negated,
      };
    case "result":
      return {
        expression: negated,
        input: negated,
        status: "input",
      };
    default:
      return state;
  }
}

function equalsClickReducer(state: AppState): AppState {
  let expression: string;

  switch (state.status) {
    case "input":
      expression = state.expression + "=";
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    case "operator":
      expression = state.expression.slice(0, -1) + "=";
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    case "negative":
      expression = state.expression.slice(0, -2) + "=";
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
  }

  return state;
}
