import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent {
  constructor(private stateService: StateService) {}

  handleClick() {
    this.stateService.deleteClick();
  }
}
