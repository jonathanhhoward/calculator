import { Component, Input } from "@angular/core";
import { StoreService } from "shared/store/store.service";

@Component({
  selector: "digit-key",
  templateUrl: "./digit-key.component.html",
})
export class DigitKeyComponent {
  @Input() symbol!: string;

  constructor(private store: StoreService) {}

  handleClick() {
    this.store.onDigitClick(this.symbol);
  }
}
