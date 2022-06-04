import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "./app.actions";
import { Payload } from "./app.actions";
import { AppState, selectAppState } from "./app.feature";

@Injectable()
export class StoreFacade {
  appState$ = this.store.select(selectAppState);

  constructor(private store: Store<AppState>) {}

  onClearClicked() {
    this.store.dispatch(actions.clearClicked());
  }
  onDeleteClicked() {
    this.store.dispatch(actions.deletClicked());
  }
  onDigitClicked(payload: Payload) {
    this.store.dispatch(actions.digitClicked(payload));
  }
  onOperatorInput(payload: Payload) {
    this.store.dispatch(actions.operatorInput(payload));
  }
  onOperatorOperator(payload: Payload) {
    this.store.dispatch(actions.operatorOperator(payload));
  }
  onOperatorNegateOperator(payload: Payload) {
    this.store.dispatch(actions.operatorNegateOperator(payload));
  }
  onOperatorNegative(payload: Payload) {
    this.store.dispatch(actions.operatorNegative(payload));
  }
  onOperatorResult(payload: Payload) {
    this.store.dispatch(actions.operatorResult(payload));
  }
  onEqualsInput() {
    this.store.dispatch(actions.equalsInput());
  }
  onEqualsOperator() {
    this.store.dispatch(actions.equalsOperator());
  }
  onEqualsNegative() {
    this.store.dispatch(actions.equalsNegative());
  }
}
