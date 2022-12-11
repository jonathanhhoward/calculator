import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { InputReducer } from "app/state/input.reducer";
import { BehaviorSubject, Observable } from "rxjs";

const initialState: AppState = {
  expression: "",
  input: "0",
};

@Injectable({ providedIn: "root" })
export class StateService {
  private appStateSubject = new BehaviorSubject(initialState);
  private reducer: AppReducer = this.inputReducer;

  constructor(private inputReducer: InputReducer) {}

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
    this.state = initialState;
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
