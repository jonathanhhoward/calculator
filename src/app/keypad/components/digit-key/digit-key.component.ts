import { Component, HostListener, Input } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol = "";

  constructor(private stateService: StateService) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const symbol = code.slice(6);
    const key = symbol === "Decimal" ? "." : symbol;

    if (isNumpad && key === this.symbol) {
      this.handleClick();
    }
  }

  handleClick() {
    this.stateService.onDigitClick(this.symbol);
  }
}
