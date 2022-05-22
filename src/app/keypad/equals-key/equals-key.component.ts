import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { equalsInput, equalsNegative, equalsOperator } from "store/app.actions";
import { AppState, selectAppState } from "store/app.feature";

@Component({
  selector: "equals-key",
  templateUrl: "./equals-key.component.html",
})
export class EqualsKeyComponent implements OnInit {
  private state!: AppState;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAppState).subscribe((state) => {
      this.state = state;
    });
  }

  handleClick() {
    const { state, store } = this;

    switch (state.status) {
      case "input":
        return store.dispatch(equalsInput());
      case "operator":
        return store.dispatch(equalsOperator());
      case "negative":
        return store.dispatch(equalsNegative());
    }
  }
}
