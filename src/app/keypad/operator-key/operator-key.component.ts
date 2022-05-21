import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  operatorInput,
  operatorNegateOperator,
  operatorNegative,
  operatorOperator,
  operatorResult,
} from "src/app/app.actions";
import { AppState, selectAppState } from "src/app/app.feature";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent implements OnInit {
  @Input() symbol!: string;

  private state!: AppState;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAppState).subscribe((state) => {
      this.state = state;
    });
  }

  handleClick() {
    const { state, store, symbol } = this;
    switch (state.status) {
      case "result":
        return store.dispatch(operatorResult({ symbol }));
      case "negative":
        return store.dispatch(operatorNegative({ symbol }));
      case "operator":
        return this.symbol === "-"
          ? store.dispatch(operatorNegateOperator({ symbol }))
          : store.dispatch(operatorOperator({ symbol }));
      case "input":
        return store.dispatch(operatorInput({ symbol }));
      default:
    }
  }
}
