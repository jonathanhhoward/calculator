import { Component, HostListener } from "@angular/core";
import { KeydownService } from "app/keypad/keydown.service";
import { Digit, Operator } from "app/models/types";
import { StateService } from "app/state/state.service";

@Component({
  selector: "keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent {
  constructor(
    private stateService: StateService,
    private keydownService: KeydownService
  ) {}

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
  onKeydown(code: string): void {
    this.keydownService.handleKeydown(code);
  }
}
