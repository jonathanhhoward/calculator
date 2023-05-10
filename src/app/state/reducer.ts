import { Digit, Operator } from "app/models/types";
import { State } from "app/state/state";

export interface Reducer {
  deleteClick(state: State): State;

  digitClick(state: State, symbol: Digit): State;

  operatorClick(state: State, symbol: Operator): State;

  negateClick(state: State): State;

  equalsClick(state: State): State;
}
