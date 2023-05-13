import { Injectable } from "@angular/core";
import { Digit, Operator } from "app/models/types";
import { StateService } from "app/state/state.service";

@Injectable({ providedIn: "root" })
export class KeydownService {
  private static readonly operators = new Map([
    ["Divide", "÷"],
    ["Multiply", "×"],
    ["Add", "+"],
    ["Subtract", "−"],
  ]);

  constructor(private stateService: StateService) {}

  handleKeydown(code: string): void {
    if (!code.startsWith("Numpad")) return;

    const numpadCode = code.slice("Numpad".length);

    if (numpadCode === "Enter") {
      this.stateService.equalsClick();
    } else if (numpadCode === "Decimal") {
      this.stateService.digitClick(".");
    } else if (/[0-9]/.test(numpadCode)) {
      this.stateService.digitClick(numpadCode as Digit);
    } else {
      const op = this.mapCodeToSymbol(numpadCode);
      if (op) {
        this.stateService.operatorClick(op as Operator);
      }
    }
  }

  private mapCodeToSymbol(code: string) {
    return KeydownService.operators.get(code);
  }
}
