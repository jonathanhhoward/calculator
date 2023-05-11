import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "clear-key",
  templateUrl: "./clear-key.component.html",
})
export class ClearKeyComponent {
  @Output() clearClick = new EventEmitter();
}
