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

const EQUALS = "=";
const ZERO = "0";

export const appFeature = createFeature({
  name: "app",
  reducer: createReducer(
    initialState,
    on(actions.testAction, (state, { symbol }) => ({
      ...state,
      input: symbol,
    })),
    on(actions.clearClicked, () => initialState),
    on(actions.deletClicked, (state) => {
      if (state.status !== "input") return state;

      return {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + ZERO,
        input: ZERO,
      };
    }),
    on(actions.digitClicked, (state, { symbol }) => {
      const isMaxDigits = state.input.replace(/[.-]/g, "").length === 10;

      if (isMaxDigits && state.status !== "result") return state;

      if (symbol === ".") {
        if (state.input.includes(".") && state.status !== "result") {
          return state;
        }

        if (state.input === "0" || state.status !== "input") {
          symbol = "0.";
        }
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
    }),
    on(actions.operatorInput, (state, { symbol }) => ({
      expression: state.expression + symbol,
      input: symbol,
      status: "operator",
    })),
    on(actions.operatorOperator, (state, { symbol }) => ({
      expression: state.expression.slice(0, -1) + symbol,
      input: symbol,
      status: "operator",
    })),
    on(actions.operatorNegateOperator, (state, { symbol }) => ({
      expression: state.expression + symbol,
      input: symbol,
      status: "negative",
    })),
    on(actions.operatorNegative, (state, { symbol }) => ({
      expression: state.expression.slice(0, -2) + symbol,
      input: symbol,
      status: "operator",
    })),
    on(actions.operatorResult, (state, { symbol }) => ({
      expression: state.input + symbol,
      input: symbol,
      status: "operator",
    })),
    on(actions.equalsInput, (state) => {
      const expression = state.expression + EQUALS;
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    }),
    on(actions.equalsOperator, (state) => {
      const expression = state.expression.slice(0, -1) + EQUALS;
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    }),
    on(actions.equalsNegative, (state) => {
      const expression = state.expression.slice(0, -2) + EQUALS;
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    })
  ),
});

export const { selectAppState } = appFeature;
