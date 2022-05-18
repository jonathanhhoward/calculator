import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { clear } from "src/app/app.actions";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(private store: Store) {}

  handleClick() {
    this.store.dispatch(clear());
  }
}
