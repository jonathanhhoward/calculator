import { Injectable, signal } from "@angular/core";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { FloatingPointReducer } from "app/state/floating-point.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { Reducer } from "app/state/reducer";
import { ResultReducer } from "app/state/result.reducer";
import { State } from "app/state/state";

@Injectable({ providedIn: "root" })
export class StateService {
  readonly #floatingPointReducer: FloatingPointReducer;
  readonly #operatorReducer: OperatorReducer;
  readonly #resultReducer: ResultReducer;
  #reducer: Reducer;

  readonly #initialState: Readonly<State> = {
    expression: "",
    input: new FloatingPoint("0"),
  };
  #stateSignal = signal(this.#initialState);

  constructor(
    floatingPointReducer: FloatingPointReducer,
    operatorReducer: OperatorReducer,
    resultReducer: ResultReducer,
  ) {
    this.#floatingPointReducer = floatingPointReducer;
    this.#operatorReducer = operatorReducer;
    this.#resultReducer = resultReducer;
    this.#reducer = this.#floatingPointReducer;
  }

  get state(): State {
    return this.#stateSignal();
  }

  set #state(state: State) {
    this.#stateSignal.set(state);
  }

  clearClick(): void {
    this.#state = this.#initialState;
    this.#reducer = this.#floatingPointReducer;
  }

  deleteClick(): void {
    this.#state = this.#reducer.deleteClick(this.state);
  }

  digitClick(symbol: Digit): void {
    this.#state = this.#reducer.digitClick(this.state, symbol);
    this.#reducer = this.#floatingPointReducer;
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
