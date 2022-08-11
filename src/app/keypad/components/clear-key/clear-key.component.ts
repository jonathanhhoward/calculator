import { Component } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(private store: StoreService) {}

  handleClick() {
    this.store.onClearClick();
  }
}
