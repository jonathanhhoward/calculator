import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "negate-key",
  templateUrl: "./negate-key.component.html",
})
export class NegateKeyComponent {
  @Output() negateClick = new EventEmitter();
}
