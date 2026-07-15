import { Digit, Operator } from "../models/types";
import { State } from "../state/state";

export interface Reducer {
  deleteClick(state: State): State;

  digitClick(state: State, symbol: Digit): State;

  operatorClick(state: State, symbol: Operator): State;

  negateClick(state: State): State;

  equalsClick(state: State): State;
}
