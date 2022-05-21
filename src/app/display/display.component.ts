import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState, selectAppState } from "../app.feature";

@Component({
  selector: "display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
})
export class DisplayComponent implements OnInit {
  state$!: Observable<AppState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.state$ = this.store.select(selectAppState);
  }
}
