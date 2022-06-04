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
    on(actions.clearClick, () => initialState),
    on(actions.deleteClick, (state) => {
      if (state.status !== "input") return state;

      return {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + ZERO,
        input: ZERO,
      };
    }),
    on(actions.digitClick, (state, { symbol }) => {
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
    on(actions.operatorClick, (state, { symbol }) => {
      switch (state.status) {
        case "input":
          return {
            expression: state.expression + symbol,
            input: symbol,
            status: "operator",
          };
        case "operator":
          return symbol === "−"
            ? {
                expression: state.expression + "-",
                input: "-",
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
    }),
    on(actions.equalsClick, (state) => {
      let expression: string;

      switch (state.status) {
        case "input":
          expression = state.expression + EQUALS;
          return {
            expression,
            input: calculate(expression),
            status: "result",
          };
        case "operator":
          expression = state.expression.slice(0, -1) + EQUALS;
          return {
            expression,
            input: calculate(expression),
            status: "result",
          };
        case "negative":
          expression = state.expression.slice(0, -2) + EQUALS;
          return {
            expression,
            input: calculate(expression),
            status: "result",
          };
      }

      return state;
    })
  ),
});

export const { selectAppState } = appFeature;
