import { Component, HostListener } from "@angular/core";
import { ResultReducer } from "app/state/result.reducer";
import { StateService } from "app/state/state.service";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent {
  constructor(
    private stateService: StateService,
    private resultReducer: ResultReducer
  ) {}
  @HostListener("window:keydown", ["$event.code"])
  handleKeydown(code: string) {
    const isThisEquals = code === "NumpadEnter";

    if (isThisEquals) this.handleClick();
  }

  handleClick() {
    this.stateService.onEqualsClick();
    this.stateService.setReducer(this.resultReducer);
  }
}
