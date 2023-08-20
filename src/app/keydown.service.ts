import { Injectable } from "@angular/core";
import { Digit, Operator } from "app/models/types";
import { StateService } from "app/state/state.service";

@Injectable({ providedIn: "root" })
export class KeydownService {
  private readonly operators = new Map<string, Operator>([
    ["Divide", "÷"],
    ["Multiply", "×"],
    ["Add", "+"],
    ["Subtract", "−"],
  ]);

  constructor(private stateService: StateService) {}

  handleKeydown(eventCode: string): void {
    if (!eventCode.startsWith("Numpad")) return;

    const numpadCode = eventCode.slice("Numpad".length);

    if (numpadCode === "Enter") {
      this.stateService.equalsClick();
    } else if (numpadCode === "Decimal") {
      this.stateService.digitClick(".");
    } else if (this.isDigit(numpadCode)) {
      this.stateService.digitClick(numpadCode);
    } else {
      const operator = this.operators.get(numpadCode);
      if (operator) {
        this.stateService.operatorClick(operator);
      }
    }
  }

  private isDigit(code: string): code is Digit {
    return /\d/.test(code);
  }
}
