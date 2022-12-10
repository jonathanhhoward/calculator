import { Component } from "@angular/core";
import { InputReducer } from "app/state/input.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "negate-key",
  templateUrl: "./negate-key.component.html",
})
export class NegateKeyComponent {
  constructor(
    private stateService: StateService,
    private inputReducer: InputReducer
  ) {}

  handleClick() {
    this.stateService.onNegateClick();
    if (this.stateService.reducer instanceof OperatorReducer) return;
    this.stateService.reducer = this.inputReducer;
  }
}
