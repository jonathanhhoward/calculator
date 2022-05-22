import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  digitInput,
  digitNegative,
  digitOperator,
  digitResult,
  digitZeroInput,
} from "app/app.actions";
import { AppState, selectAppState } from "app/app.feature";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent implements OnInit {
  @Input() symbol!: string;

  private state!: AppState;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAppState).subscribe((state) => {
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
          ? store.dispatch(digitZeroInput({ symbol }))
          : store.dispatch(digitInput({ symbol }));
      case "operator":
        return store.dispatch(digitOperator({ symbol }));
      case "negative":
        return store.dispatch(digitNegative({ symbol }));
      case "result":
        return store.dispatch(digitResult({ symbol }));
    }
  }
}
