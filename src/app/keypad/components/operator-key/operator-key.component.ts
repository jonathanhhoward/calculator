import { Component, HostListener, Input } from "@angular/core";
import { OperatorReducer } from "app/state/operator.reducer";
import { StateService } from "app/state/state.service";

const operatorMap = new Map([
  ["Divide", "÷"],
  ["Multiply", "×"],
  ["Add", "+"],
  ["Subtract", "−"],
]);

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
    const isNumpad = code.slice(0, 6) === "Numpad";
    const isOperator = operatorMap.get(code.slice(6)) === this.symbol;

    if (isNumpad && isOperator) this.handleClick();
  }

  handleClick() {
    this.stateService.onOperatorClick(this.symbol);
    this.stateService.reducer = this.operatorReducer;
  }
}
