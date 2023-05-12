import { Component, HostListener } from "@angular/core";
import { Digit } from "app/models/types";
import { StateService } from "app/state/state.service";

@Component({
  selector: "keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent {
  constructor(private stateService: StateService) {}

  onClearClick(): void {
    this.stateService.clearClick();
  }

  onDeleteClick(): void {
    this.stateService.deleteClick();
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

    const key = code.slice("Numpad".length);

    if (key === "Enter") this.onEqualsClick();
    else if (key === "Decimal") this.onDigitClick(".");
    else if (/[0-9]/.test(key)) this.onDigitClick(key as Digit);
  }
}
