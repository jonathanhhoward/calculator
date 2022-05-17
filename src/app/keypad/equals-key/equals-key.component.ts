import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { testAction } from "src/app/app.actions";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(private store: Store) {}

  handleClick() {
    this.store.dispatch(testAction({ symbol: "=" }));
  }
}
