import { Component, Input } from "@angular/core";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
  styleUrls: ["./operator-key.component.scss"],
})
export class OperatorKeyComponent {
  @Input() symbol = "?";
}
