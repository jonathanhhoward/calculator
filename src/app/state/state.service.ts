import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { InputReducer } from "app/state/input.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { ResultReducer } from "app/state/result.reducer";
import { BehaviorSubject, Observable } from "rxjs";

const initialState: AppState = {
  expression: "",
  input: "0",
  inputMode: "input",
};

@Injectable({ providedIn: "root" })
export class StateService {
  private appStateSubject = new BehaviorSubject(initialState);
  private reducer: AppReducer = this.inputReducer;

  constructor(
    private inputReducer: InputReducer,
    private operatorReducer: OperatorReducer,
    private resultReducer: ResultReducer
  ) {}

  get appState$(): Observable<AppState> {
    return this.appStateSubject.asObservable();
  }

  private get state(): AppState {
    return this.appStateSubject.getValue();
  }

  private set state(newState: AppState) {
    this.appStateSubject.next(newState);
  }

  onClearClick(): void {
    this.iterate(initialState);
  }

  onDeleteClick(): void {
    this.iterate(this.reducer.deleteClick(this.state));
  }

  onDigitClick(symbol: string): void {
    this.iterate(this.reducer.digitClick(this.state, symbol));
  }

  onOperatorClick(symbol: string): void {
    this.iterate(this.reducer.operatorClick(this.state, symbol));
  }

  onNegateClick(): void {
    this.iterate(this.reducer.negateClick(this.state));
  }

  onEqualsClick(): void {
    this.iterate(this.reducer.equalsClick(this.state));
  }

  private iterate(nextState: AppState): void {
    this.state = nextState;
    this.setReducer();
  }

  private setReducer(): void {
    switch (this.state.inputMode) {
      case "input":
        this.reducer = this.inputReducer;
        break;
      case "operator":
        this.reducer = this.operatorReducer;
        break;
      case "result":
        this.reducer = this.resultReducer;
    }
  }
}
