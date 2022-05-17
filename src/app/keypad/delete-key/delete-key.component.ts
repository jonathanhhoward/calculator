import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { testAction } from "src/app/app.actions";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent {
  constructor(private store: Store) {}

  handleClick() {
    this.store.dispatch(testAction({ symbol: "C" }));
  }
}
