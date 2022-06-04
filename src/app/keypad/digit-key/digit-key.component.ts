import { Component, Input } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreFacade) {}

  handleClick() {
    const { store, symbol } = this;
    store.onDigitClicked({ symbol });
  }
}
