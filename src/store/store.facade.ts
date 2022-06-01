import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "./app.actions";
import { Payload } from "./app.actions";
import { AppState, selectAppState } from "./app.feature";

@Injectable()
export class StoreFacade {
  appState$ = this.store.select(selectAppState);

  constructor(private store: Store<AppState>) {}

  onClear() {
    this.store.dispatch(actions.clear());
  }
  onDelete() {
    this.store.dispatch(actions.deLete());
  }
  onDigitInput(payload: Payload) {
    this.store.dispatch(actions.digitInput(payload));
  }
  onDigitZeroInput(payload: Payload) {
    this.store.dispatch(actions.digitZeroInput(payload));
  }
  onDigitOperator(payload: Payload) {
    this.store.dispatch(actions.digitOperator(payload));
  }
  onDigitNegative(payload: Payload) {
    this.store.dispatch(actions.digitNegative(payload));
  }
  onDigitResult(payload: Payload) {
    this.store.dispatch(actions.digitResult(payload));
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
