import { Injectable } from "@angular/core";
import { NumberReducer } from "app/state/number.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { Reducer } from "app/state/reducer";
import { ResultReducer } from "app/state/result.reducer";
import { State } from "app/state/state";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StateService {
  private readonly initialState: State = { expression: "", input: "0" };
  private readonly stateSubject = new BehaviorSubject(this.initialState);
  private readonly numberReducer = new NumberReducer();
  private readonly operatorReducer = new OperatorReducer();
  private readonly resultReducer = new ResultReducer();
  private reducer: Reducer = this.numberReducer;

  get state$(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  private get state(): State {
    return this.stateSubject.getValue();
  }

  private set state(state: State) {
    this.stateSubject.next(state);
  }

  onClearClick(): void {
    this.state = this.initialState;
    this.reducer = this.numberReducer;
  }

  onDeleteClick(): void {
    this.state = this.reducer.deleteClick(this.state);
  }

  onDigitClick(symbol: string): void {
    this.state = this.reducer.digitClick(this.state, symbol);
    this.reducer = this.numberReducer;
  }

  onOperatorClick(symbol: string): void {
    this.state = this.reducer.operatorClick(this.state, symbol);
    this.reducer = this.operatorReducer;
  }

  onNegateClick(): void {
    this.state = this.reducer.negateClick(this.state);
  }

  onEqualsClick(): void {
    this.state = this.reducer.equalsClick(this.state);
    this.reducer = this.resultReducer;
  }
}
