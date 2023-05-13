import { Component, HostListener } from "@angular/core";
import { KeydownService } from "app/keydown.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private keydownService: KeydownService) {}

  @HostListener("window:keydown", ["$event.code"])
  onKeydown(code: string): void {
    this.keydownService.handleKeydown(code);
  }
}
