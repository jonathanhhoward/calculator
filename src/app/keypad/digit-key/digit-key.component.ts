import { Component, Input } from "@angular/core";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
  styleUrls: ["./digit-key.component.scss"],
})
export class DigitKeyComponent {
  @Input() symbol: string = "?";
}
