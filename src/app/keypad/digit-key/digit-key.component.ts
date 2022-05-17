import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { testAction } from "src/app/app.actions";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol: string = "?";

  constructor(private store: Store) {}

  handleClick() {
    this.store.dispatch(testAction({ symbol: this.symbol }));
  }
}
