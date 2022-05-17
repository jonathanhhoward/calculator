import { createFeature, createReducer, on } from "@ngrx/store";
import * as AppActions from "./app.actions";

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
    on(AppActions.testAction, (state, { symbol }) => ({
      ...state,
      input: symbol,
    }))
  ),
});

export const { selectExpression, selectInput, selectStatus } = feature;
