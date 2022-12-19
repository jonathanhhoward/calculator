import { Inject, Injectable } from "@angular/core";
import { APP_REDUCER, AppReducer } from "app/state/app-reducer";
import { APP_STATE, AppState } from "app/state/app-state";
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

  onClearClick(nextReducer: AppReducer): void {
    this.state = this.initialState;
    this.reducer = nextReducer;
  }

  onDeleteClick(): void {
    this.state = this.reducer.deleteClick(this.state);
  }

  onDigitClick(symbol: string, nextReducer: AppReducer): void {
    this.state = this.reducer.digitClick(this.state, symbol);
    this.reducer = nextReducer;
  }

  onOperatorClick(symbol: string, nextReducer: AppReducer): void {
    this.state = this.reducer.operatorClick(this.state, symbol);
    this.reducer = nextReducer;
  }

  onNegateClick(): void {
    this.state = this.reducer.negateClick(this.state);
  }

  onEqualsClick(nextReducer: AppReducer): void {
    this.state = this.reducer.equalsClick(this.state);
    this.reducer = nextReducer;
  }
}
