import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { testAction } from "src/app/app.actions";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol = "?";

  constructor(private store: Store) {}

  handleClick() {
    this.store.dispatch(testAction({ symbol: this.symbol }));
  }
}
