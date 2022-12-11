import { Inject, Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { APP_REDUCER, APP_STATE } from "app/state/state.service.provider";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class StateService {
  private appStateSubject: BehaviorSubject<AppState>;

  constructor(
    @Inject(APP_STATE) private initialState: AppState,
    @Inject(APP_REDUCER) private reducer: AppReducer
  ) {
    this.appStateSubject = new BehaviorSubject(this.initialState);
  }

  get appState$(): Observable<AppState> {
    return this.appStateSubject.asObservable();
  }

  private get state(): AppState {
    return this.appStateSubject.getValue();
  }

  private set state(newState: AppState) {
    this.appStateSubject.next(newState);
  }

  setReducer(reducer: AppReducer) {
    this.reducer = reducer;
  }

  onClearClick(): void {
    this.state = this.initialState;
  }

  onDeleteClick(): void {
    this.state = this.reducer.deleteClick(this.state);
  }

  onDigitClick(symbol: string): void {
    this.state = this.reducer.digitClick(this.state, symbol);
  }

  onOperatorClick(symbol: string): void {
    this.state = this.reducer.operatorClick(this.state, symbol);
  }

  onNegateClick(): void {
    this.state = this.reducer.negateClick(this.state);
  }

  onEqualsClick(): void {
    this.state = this.reducer.equalsClick(this.state);
  }
}
