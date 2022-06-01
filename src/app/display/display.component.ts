import { Component } from "@angular/core";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
})
export class DisplayComponent {
  constructor(public store: StoreFacade) {}
}
