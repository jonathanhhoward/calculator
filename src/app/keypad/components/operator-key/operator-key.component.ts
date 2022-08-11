import { Component, Input } from "@angular/core";
import { StoreService } from "app/store/store.service";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreService) {}

  handleClick() {
    this.store.onOperatorClick(this.symbol);
  }
}
