import { Injectable } from "@angular/core";
import { FloatingPoint } from "app/models/floating-point";
import { Digit, Operator } from "app/models/types";
import { NumberReducer } from "app/state/number.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { Reducer } from "app/state/reducer";
import { ResultReducer } from "app/state/result.reducer";
import { State } from "app/state/state";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StateService {
  private readonly initialState: State = {
    expression: "",
    input: new FloatingPoint(),
  };
  private readonly stateSubject = new BehaviorSubject(this.initialState);
  private reducer: Reducer;

  constructor(
    private readonly numberReducer: NumberReducer,
    private readonly operatorReducer: OperatorReducer,
    private readonly resultReducer: ResultReducer
  ) {
    this.reducer = this.numberReducer;
  }

  get state$(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  private get state(): State {
    return this.stateSubject.getValue();
  }

  private set state(state: State) {
    this.stateSubject.next(state);
  }

  clearClick(): void {
    this.state = this.initialState;
    this.reducer = this.numberReducer;
  }

  deleteClick(): void {
    this.state = this.reducer.deleteClick(this.state);
  }

  digitClick(symbol: Digit): void {
    this.state = this.reducer.digitClick(this.state, symbol);
    this.reducer = this.numberReducer;
  }

  operatorClick(symbol: Operator): void {
    this.state = this.reducer.operatorClick(this.state, symbol);
    this.reducer = this.operatorReducer;
  }

  negateClick(): void {
    this.state = this.reducer.negateClick(this.state);
  }

  equalsClick(): void {
    this.state = this.reducer.equalsClick(this.state);
    this.reducer = this.resultReducer;
  }
}
