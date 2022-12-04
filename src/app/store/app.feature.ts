import { createFeature, createReducer, on } from "@ngrx/store";
import { AppReducer } from "app/store/app.reducer";
import { InputReducer } from "app/store/input.reducer";
import * as actions from "./app.actions";

export interface AppState {
  expression: string;
  input: string;
  reducer: AppReducer;
}

export const initialState: AppState = {
  expression: "0",
  input: "0",
  reducer: new InputReducer(),
};

export const appFeature = createFeature({
  name: "app",
  reducer: createReducer(
    initialState,
    on(actions.clearClick, (state) => state.reducer.clearClick()),
    on(actions.deleteClick, (state) => state.reducer.deleteClick(state)),
    on(actions.digitClick, (state, payload) =>
      state.reducer.digitClick(state, payload)
    ),
    on(actions.operatorClick, (state, payload) =>
      state.reducer.operatorClick(state, payload)
    ),
    on(actions.negateClick, (state) => state.reducer.negateClick(state)),
    on(actions.equalsClick, (state) => state.reducer.equalsClick(state))
  ),
});

export const { selectAppState } = appFeature;
