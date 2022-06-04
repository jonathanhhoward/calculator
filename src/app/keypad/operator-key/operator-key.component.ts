import { Component, Input } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreFacade) {}

  handleClick() {
    const { store, symbol } = this;
    store.onOperatorClick({ symbol });
  }
}
