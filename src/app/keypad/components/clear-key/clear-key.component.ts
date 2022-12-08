import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  constructor(private stateService: StateService) {}

  handleClick() {
    this.stateService.onClearClick();
  }
}
