import { Component, Input } from "@angular/core";
import { AppState } from "store/app.feature";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol!: string;

  private state!: AppState;

  constructor(private store: StoreFacade) {
    this.store.appState$.subscribe((state) => {
      this.state = state;
    });
  }

  handleClick() {
    if (this.symbol === ".") {
      this.handleDecimal();
    } else {
      this.handleDigit(this.symbol);
    }
  }

  private handleDecimal() {
    const { state } = this;

    if (state.input.includes(".") && state.status !== "result") return;

    if (state.input === "0" || state.status !== "input") {
      this.handleDigit("0.");
    } else {
      this.handleDigit(".");
    }
  }

  private handleDigit(symbol: string) {
    const { state, store } = this;
    const isMaxDigits = state.input.replace(/[.-]/g, "").length === 10;

    if (isMaxDigits && state.status !== "result") return;

    switch (state.status) {
      case "input":
        return state.input === "0"
          ? store.onDigitZeroInput({ symbol })
          : store.onDigitInput({ symbol });
      case "operator":
        return store.onDigitOperator({ symbol });
      case "negative":
        return store.onDigitNegative({ symbol });
      case "result":
        return store.onDigitResult({ symbol });
    }
  }
}
