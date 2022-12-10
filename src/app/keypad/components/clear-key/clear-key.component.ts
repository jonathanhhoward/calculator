import { Component } from "@angular/core";
import { InputReducer } from "app/state/input.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(
    private stateService: StateService,
    private inputReducer: InputReducer
  ) {}

  handleClick() {
    this.stateService.onClearClick();
    this.stateService.reducer = this.inputReducer;
  }
}
