import { Component } from "@angular/core";
import { StoreFacade } from "lib/store.facade";

@Component({
  selector: "negate-key",
  templateUrl: "./negate-key.component.html",
})
export class NegateKeyComponent {
  constructor(private store: StoreFacade) {}

  handleClick() {
    this.store.onNegateClick();
  }
}
