import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
  standalone: true,
})
export class DisplayComponent {
  readonly stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }
}
