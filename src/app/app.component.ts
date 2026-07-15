import { Component } from "@angular/core";
import { DisplayComponent } from "./display/display.component";
import { KeydownService } from "./keydown.service";
import { KeypadComponent } from "./keypad/keypad.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [DisplayComponent, KeypadComponent],
})
export class AppComponent {
  #keydownService: KeydownService;

  constructor(keydownService: KeydownService) {
    this.#keydownService = keydownService;
  }

  onKeydown(event: KeyboardEvent): void {
    this.#keydownService.handleKeydown(event.code);
  }
}
