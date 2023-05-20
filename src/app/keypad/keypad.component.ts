import { Component } from "@angular/core";
import { Digit, Operator } from "app/models/types";
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

  onOperatorClick(symbol: string) {
    this.stateService.operatorClick(<Operator>symbol);
  }

  onNegateClick(): void {
    this.stateService.negateClick();
  }

  onEqualsClick(): void {
    this.stateService.equalsClick();
  }

  onDigitClick(symbol: string): void {
    this.stateService.digitClick(<Digit>symbol);
  }
}
