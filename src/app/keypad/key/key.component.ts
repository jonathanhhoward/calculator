import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-key",
    templateUrl: "./key.component.html",
    styleUrls: ["./key.component.scss"],
    standalone: true,
})
export class KeyComponent {
  @Input() type = "";
  @Input() symbol = "";
  @Output() action = new EventEmitter<string>();
}
