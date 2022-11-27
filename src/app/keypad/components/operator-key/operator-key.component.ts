import { Component, HostListener, Input } from "@angular/core";
import { StoreService } from "app/store/store.service";

const operatorMap = new Map([
  ["Divide", "÷"],
  ["Multiply", "×"],
  ["Add", "+"],
  ["Subtract", "−"],
]);

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreService) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isNumpad = code.slice(0, 6) === "Numpad";
    const key = code.slice(6);

    if (isNumpad && operatorMap.get(key) === this.symbol) {
      this.handleClick();
    }
  }

  handleClick() {
    this.store.onOperatorClick(this.symbol);
  }
}
