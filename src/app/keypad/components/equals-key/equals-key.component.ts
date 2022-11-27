import { Component, HostListener } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(private store: StoreService) {}
  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const isEnter = code.slice(6) === "Enter";

    if (isNumpad && isEnter) {
      this.handleClick();
    }
  }

  handleClick() {
    this.store.onEqualsClick();
  }
}
