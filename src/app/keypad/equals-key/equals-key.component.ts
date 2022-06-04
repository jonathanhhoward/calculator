import { Component } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(private store: StoreFacade) {}

  handleClick() {
    this.store.onEqualsClicked();
  }
}
