import { Component } from "@angular/core";
import { KeydownService } from "app/keydown.service";
import { DisplayComponent } from "./display/display.component";
import { KeypadComponent } from "./keypad/keypad.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [DisplayComponent, KeypadComponent],
})
export class AppComponent {
  constructor(private keydownService: KeydownService) {}

  onKeydown(event: KeyboardEvent): void {
    this.keydownService.handleKeydown(event.code);
  }
}
