import { Component, HostListener, Input } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreService) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const symbol = code.slice(6);
    const key = symbol === "Decimal" ? "." : symbol;

    if (isNumpad && key === this.symbol) {
      this.handleClick();
    }
  }

  handleClick() {
    this.store.onDigitClick(this.symbol);
  }
}
