import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { deLete } from "app/app.actions";
import { AppState, selectAppState } from "app/app.feature";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent implements OnInit {
  private state!: AppState;

  constructor(private store: Store) {}

  handleClick() {
    if (this.state.status === "input") {
      this.store.dispatch(deLete());
    }
  }

  ngOnInit(): void {
    this.store.select(selectAppState).subscribe((state) => {
      this.state = state;
    });
  }
}
