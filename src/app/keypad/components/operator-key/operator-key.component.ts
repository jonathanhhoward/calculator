import { Component, HostListener, Input } from "@angular/core";
import { OperatorReducer } from "app/state/operator.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "operator-key",
  templateUrl: "./operator-key.component.html",
})
export class OperatorKeyComponent {
  @Input() symbol = "";

  constructor(
    private stateService: StateService,
    private operatorReducer: OperatorReducer
  ) {}

  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isThisOperator =
      this.mapCodeToOperator(code) === "Numpad" + this.symbol;

    if (isThisOperator) this.handleClick();
  }

  handleClick() {
    this.stateService.onOperatorClick(this.symbol);
    this.stateService.setReducer(this.operatorReducer);
  }

  private mapCodeToOperator(code: string): string {
    const operators = new Map([
      ["Divide", "÷"],
      ["Multiply", "×"],
      ["Add", "+"],
      ["Subtract", "−"],
    ]);

    return code.slice(0, 6) + operators.get(code.slice(6));
  }
}
