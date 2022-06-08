import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "store/app.actions";
import { AppState, selectAppState } from "store/app.feature";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  appState$ = this.store.select(selectAppState);

  constructor(private store: Store<AppState>) {}

  onClearClick() {
    this.store.dispatch(actions.clearClick());
  }
  onDeleteClick() {
    this.store.dispatch(actions.deleteClick());
  }
  onDigitClick(symbol: string) {
    this.store.dispatch(actions.digitClick({ symbol }));
  }
  onOperatorClick(symbol: string) {
    this.store.dispatch(actions.operatorClick({ symbol }));
  }
  onNegateClick() {
    this.store.dispatch(actions.negateClick());
  }
  onEqualsClick() {
    this.store.dispatch(actions.equalsClick());
  }
}
