import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent {
  @Output() deleteClick = new EventEmitter();
}
