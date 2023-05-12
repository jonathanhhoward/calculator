import { Component, HostListener } from "@angular/core";
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

  onEqualsClick() {
    this.stateService.equalsClick();
  }

  onNegateClick() {
    this.stateService.negateClick();
  }

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isThisEquals = code === "NumpadEnter";

    if (isThisEquals) this.onEqualsClick();
  }
}
