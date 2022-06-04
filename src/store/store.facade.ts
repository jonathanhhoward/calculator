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
  onDigitClick(payload: actions.Payload) {
    this.store.dispatch(actions.digitClick(payload));
  }
  onOperatorClick(payload: actions.Payload) {
    this.store.dispatch(actions.operatorClick(payload));
  }
  onEqualsClick() {
    this.store.dispatch(actions.equalsClick());
  }
}
