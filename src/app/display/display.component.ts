import { Component } from "@angular/core";
import { StateService } from "app/state/state.service";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
})
export class DisplayComponent {
  constructor(public stateService: StateService) {}
}
