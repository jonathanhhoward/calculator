import { Component, HostListener } from "@angular/core";
import { Digit, Operator } from "app/models/types";
import { StateService } from "app/state/state.service";

@Component({
  selector: "keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent {
  private static readonly operators = new Map([
    ["Divide", "÷"],
    ["Multiply", "×"],
    ["Add", "+"],
    ["Subtract", "−"],
  ]);

  constructor(private stateService: StateService) {}

  onClearClick(): void {
    this.stateService.clearClick();
  }

  onDeleteClick(): void {
    this.stateService.deleteClick();
  }

  onOperatorClick(symbol: Operator) {
    this.stateService.operatorClick(symbol);
  }

  onNegateClick(): void {
    this.stateService.negateClick();
  }

  onEqualsClick(): void {
    this.stateService.equalsClick();
  }

  onDigitClick(symbol: Digit): void {
    this.stateService.digitClick(symbol);
  }

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string): void {
    if (!code.startsWith("Numpad")) return;

    const numpadCode = code.slice("Numpad".length);

    if (numpadCode === "Enter") {
      this.onEqualsClick();
    } else if (numpadCode === "Decimal") {
      this.onDigitClick(".");
    } else if (/[0-9]/.test(numpadCode)) {
      this.onDigitClick(numpadCode as Digit);
    } else {
      const op = this.mapCodeToSymbol(numpadCode);
      if (op) {
        this.onOperatorClick(op as Operator);
      }
    }
  }

  private mapCodeToSymbol(code: string) {
    return KeypadComponent.operators.get(code);
  }
}
