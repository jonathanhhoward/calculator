import { State } from "app/state/state";

export interface Reducer {
  deleteClick(state: State): State;

  digitClick(state: State, symbol: string): State;

  operatorClick(state: State, symbol: string): State;

  negateClick(state: State): State;

  equalsClick(state: State): State;
}
