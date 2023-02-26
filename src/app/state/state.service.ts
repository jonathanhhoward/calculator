import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Reducer } from "app/state/reducer";
import { State } from "app/state/state";
import { BehaviorSubject, Observable } from "rxjs";

export const INITIAL_STATE = new InjectionToken<State>("InitialState");
export const NUMBER_REDUCER = new InjectionToken<Reducer>("NumberReducer");
export const OPERATOR_REDUCER = new InjectionToken<Reducer>("OperatorReducer");
export const RESULT_REDUCER = new InjectionToken<Reducer>("ResultReducer");

@Injectable({ providedIn: "root" })
export class StateService {
  private stateSubject = new BehaviorSubject(this.initialState);
  private reducer: Reducer = this.numberReducer;

  constructor(
    @Inject(INITIAL_STATE) private readonly initialState: State,
    @Inject(NUMBER_REDUCER) private numberReducer: Reducer,
    @Inject(OPERATOR_REDUCER) private operatorReducer: Reducer,
    @Inject(RESULT_REDUCER) private resultReducer: Reducer
  ) {}

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
