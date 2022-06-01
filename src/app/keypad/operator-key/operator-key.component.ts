import { Component, Input } from "@angular/core";
import { AppState } from "store/app.feature";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol!: string;

  private state!: AppState;

  constructor(private store: StoreFacade) {
    this.store.appState$.subscribe((state) => {
      this.state = state;
    });
  }

  handleClick() {
    const { state, store, symbol } = this;
    switch (state.status) {
      case "input":
        return store.onOperatorInput({ symbol });
      case "operator":
        return this.symbol === "-"
          ? store.onOperatorNegateOperator({ symbol })
          : store.onOperatorOperator({ symbol });
      case "negative":
        return store.onOperatorNegative({ symbol });
      case "result":
        return store.onOperatorResult({ symbol });
    }
  }
}
