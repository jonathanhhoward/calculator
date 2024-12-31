import { Component } from "@angular/core";
import { Digit, Operator } from "app/models/types";
import { StateService } from "app/state/state.service";
import { KeyComponent } from "./key/key.component";

@Component({
  selector: "app-keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
  standalone: true,
  imports: [KeyComponent],
})
export class KeypadComponent {
  private stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

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
