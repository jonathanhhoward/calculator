import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  @Output() equalsClick = new EventEmitter();
}
