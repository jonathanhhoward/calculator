import { Component } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent {
  constructor(private store: StoreFacade) {}

  handleClick() {
    this.store.onDeleteClicked();
  }
}
