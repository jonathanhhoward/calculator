import { createFeature, createReducer, on } from "@ngrx/store";
import { calculate } from "src/lib/calculate";
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

export const feature = createFeature({
  name: "app",
  reducer: createReducer(
    initialState,
    on(actions.testAction, (state, { symbol }) => ({
      ...state,
      input: symbol,
    })),
    on(actions.clear, () => initialState),
    on(actions.deLete, (state) => ({
      ...state,
      expression: state.expression.slice(0, -state.input.length) + ZERO,
      input: ZERO,
    })),
    on(actions.digitInput, (state, { symbol }) => ({
      expression: state.expression + symbol,
      input: state.input + symbol,
      status: "input",
    })),
    on(actions.digitZeroInput, (state, { symbol }) => ({
      expression: state.expression.slice(0, -1) + symbol,
      input: symbol,
      status: "input",
    })),
    on(actions.digitOperator, (state, { symbol }) => ({
      expression: state.expression + symbol,
      input: symbol,
      status: "input",
    })),
    on(actions.digitNegative, (state, { symbol }) => ({
      expression: state.expression + symbol,
      input: state.input + symbol,
      status: "input",
    })),
    on(actions.digitResult, (_, { symbol }) => ({
      expression: symbol,
      input: symbol,
      status: "input",
    })),
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
    on(actions.equalsNegative, (state) => {
      const expression = state.expression.slice(0, -2) + EQUALS;
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
    on(actions.equalsInput, (state) => {
      const expression = state.expression + EQUALS;
      return {
        expression,
        input: calculate(expression),
        status: "result",
      };
    })
  ),
});

export const { selectAppState } = feature;
