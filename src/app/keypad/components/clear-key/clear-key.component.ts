import { Component } from "@angular/core";
import { NumberReducer } from "app/state/number.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(
    private stateService: StateService,
    private numberReducer: NumberReducer
  ) {}

  handleClick() {
    this.stateService.onClearClick(this.numberReducer);
  }
}
