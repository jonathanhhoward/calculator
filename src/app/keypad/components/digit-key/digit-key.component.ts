import { Component, HostListener, Input } from "@angular/core";
import { InputReducer } from "app/state/input.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol = "";

  constructor(
    private stateService: StateService,
    private inputReducer: InputReducer
  ) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const isDigit =
      code.slice(6) === "Decimal" || code.slice(6) === this.symbol;

    if (isNumpad && isDigit) this.handleClick();
  }

  handleClick() {
    this.stateService.onDigitClick(this.symbol);
    this.stateService.reducer = this.inputReducer;
  }
}
