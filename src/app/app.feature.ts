import { createFeature, createReducer, on } from "@ngrx/store";
import * as actions from "./app.actions";

export type Status = "input" | "operator" | "negative" | "equals" | "result";

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
      expression: state.expression.slice(0, -state.input.length) + "0",
      input: "0",
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
    }))
  ),
});

export const { selectAppState, selectExpression, selectInput, selectStatus } =
  feature;
