import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "store/app.feature";
import { StoreFacade } from "store/store.facade";

@Component({
  selector: "display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
})
export class DisplayComponent {
  state$: Observable<AppState>;

  constructor(private store: StoreFacade) {
    this.state$ = this.store.appState$;
  }
}
