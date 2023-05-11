import { Component } from "@angular/core";
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
}
