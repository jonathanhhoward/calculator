import { createFeature, createReducer, on } from "@ngrx/store";
import * as appActions from "./app.actions";

export type Status = "input" | "operator" | "negative" | "equals" | "result";

export interface State {
  expression: string;
  input: string;
  status: Status;
}

const initialState: State = {
  expression: "0",
  input: "0",
  status: "input",
};

export const feature = createFeature({
  name: "app",
  reducer: createReducer(
    initialState,
    on(appActions.testAction, (state, { symbol }) => ({
      ...state,
      input: symbol,
    })),
    on(appActions.clear, () => initialState),
    on(appActions.deLete, (state) => ({
      ...state,
      expression: state.expression.slice(0, -state.input.length) + "0",
      input: "0",
    }))
  ),
});

export const { selectExpression, selectInput, selectStatus } = feature;
