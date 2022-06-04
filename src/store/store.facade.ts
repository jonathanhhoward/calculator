import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "./app.actions";
import { AppState, selectAppState } from "./app.feature";

@Injectable()
export class StoreFacade {
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
  onEqualsClick() {
    this.store.dispatch(actions.equalsClick());
  }
}
