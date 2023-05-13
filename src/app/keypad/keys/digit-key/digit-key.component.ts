import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Digit } from "app/models/types";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol!: Digit;
  @Output() digitClick = new EventEmitter<Digit>();
}
