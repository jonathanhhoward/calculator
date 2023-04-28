import { Component, HostListener, Input } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol = "";

  constructor(private stateService: StateService) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isThisOperator =
      this.mapCodeToSymbol(code) === "Numpad" + this.symbol;

    if (isThisOperator) this.handleClick();
  }

  handleClick() {
    this.stateService.operatorClick(this.symbol);
  }

  private mapCodeToSymbol(code: string): string {
    const operators = new Map([
      ["Divide", "÷"],
      ["Multiply", "×"],
      ["Add", "+"],
      ["Subtract", "−"],
    ]);
    const keyCode = code.substring("Numpad".length);
    const symbol = operators.get(keyCode) ?? "";

    return code.replace(keyCode, symbol);
  }
}
