import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "key",
  templateUrl: "./key.component.html",
  styleUrls: ["./key.component.scss"],
})
export class KeyComponent {
  @Input() type = "";
  @Input() symbol = "";
  @Output() action = new EventEmitter<string>();
}
