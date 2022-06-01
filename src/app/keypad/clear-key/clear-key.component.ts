import { Component } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(private store: StoreFacade) {}

  handleClick() {
    this.store.onClear();
  }
}
