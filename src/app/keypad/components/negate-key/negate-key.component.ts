import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "negate-key",
  templateUrl: "./negate-key.component.html",
})
export class NegateKeyComponent {
  constructor(private stateService: StateService) {}

  handleClick() {
    this.stateService.negateClick();
  }
}
