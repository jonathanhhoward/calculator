import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
  standalone: true,
  imports: [NgIf],
})
export class DisplayComponent {
  stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }
}
