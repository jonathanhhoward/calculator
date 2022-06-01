import { Component, OnInit } from "@angular/core";
import { AppState } from "store/app.feature";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent implements OnInit {
  private state!: AppState;

  constructor(private store: StoreFacade) {}

  ngOnInit(): void {
    this.store.appState$.subscribe((state) => {
      this.state = state;
    });
  }

  handleClick() {
    if (this.state.status === "input") {
      this.store.onDelete();
    }
  }
}
