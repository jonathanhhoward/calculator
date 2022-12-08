import { Component, HostListener } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(private stateService: StateService) {}
  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const isEnter = code.slice(6) === "Enter";

    if (isNumpad && isEnter) {
      this.handleClick();
    }
  }

  handleClick() {
    this.stateService.onEqualsClick();
  }
}
