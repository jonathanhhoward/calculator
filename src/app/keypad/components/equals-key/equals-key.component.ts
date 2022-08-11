import { Component } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(private store: StoreService) {}

  handleClick() {
    this.store.onEqualsClick();
  }
}
