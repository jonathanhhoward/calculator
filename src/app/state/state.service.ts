import { Injectable, signal } from "@angular/core";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { NumberReducer } from "app/state/number.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { Reducer } from "app/state/reducer";
import { ResultReducer } from "app/state/result.reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class StateService {
  readonly #numberReducer: NumberReducer;
  readonly #operatorReducer: OperatorReducer;
  readonly #resultReducer: ResultReducer;
  #reducer: Reducer;

  #initialState: State = {
    expression: "",
    input: new FloatingPoint("0"),
  };
  #stateSignal = signal(this.#initialState);

  constructor(
    numberReducer: NumberReducer,
    operatorReducer: OperatorReducer,
    resultReducer: ResultReducer,
  ) {
    this.#numberReducer = numberReducer;
    this.#operatorReducer = operatorReducer;
    this.#resultReducer = resultReducer;
    this.#reducer = this.#numberReducer;
  }

  get state(): State {
    return this.#stateSignal();
  }

  set #state(state: State) {
    this.#stateSignal.set(state);
  }

  clearClick(): void {
    this.#state = this.#initialState;
    this.#reducer = this.#numberReducer;
  }

  deleteClick(): void {
    this.#state = this.#reducer.deleteClick(this.state);
  }

  digitClick(symbol: Digit): void {
    this.#state = this.#reducer.digitClick(this.state, symbol);
    this.#reducer = this.#numberReducer;
  }

  operatorClick(symbol: Operator): void {
    this.#state = this.#reducer.operatorClick(this.state, symbol);
    this.#reducer = this.#operatorReducer;
  }

  negateClick(): void {
    this.#state = this.#reducer.negateClick(this.state);
  }

  equalsClick(): void {
    this.#state = this.#reducer.equalsClick(this.state);
    this.#reducer = this.#resultReducer;
  }
}
