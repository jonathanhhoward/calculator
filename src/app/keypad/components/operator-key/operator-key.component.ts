import { Component, HostListener, Input } from "@angular/core";
import { Operator } from "app/models/types";
import { StateService } from "app/state/state.service";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  private static readonly operators = new Map([
    ["Divide", "÷"],
    ["Multiply", "×"],
    ["Add", "+"],
    ["Subtract", "−"],
  ]);
  @Input() symbol!: Operator;

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
    const keyCode = code.substring("Numpad".length);
    const symbol = OperatorKeyComponent.operators.get(keyCode) ?? "";

    return code.replace(keyCode, symbol);
  }
}
