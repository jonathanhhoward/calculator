import { Component } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent {
  constructor(private store: StoreService) {}

  handleClick() {
    this.store.onDeleteClick();
  }
}
