import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Operator } from "app/models/types";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol!: Operator;
  @Output() operatorClick = new EventEmitter<Operator>();
}
